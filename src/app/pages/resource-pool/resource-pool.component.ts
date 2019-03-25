import { Component, OnInit } from '@angular/core';
import { KafkaService } from '../../shared/services/kafka.service';

@Component({
  moduleId: module.id,
  selector: 'app-resource-pool',
  templateUrl: './resource-pool.component.html',
  styleUrls: ['./resource-pool.component.scss'],
})
export class ResourcePoolComponent implements OnInit {

  public robots: any = [{
    name: 'ROBOT-7485',
    platform: {
      name: 'Mac OS',
      version: '10.13.6',
    },
    cpu: {
      cores: 0,
      pct: 0,
    },
    ram: {
      used: 0,
      free: 0,
      total: 0,
    },
    disk: {
      total: 0,
      available: 0,
      used: 0,
      pct: 0,
    },
  }];

  constructor(private kafkaService: KafkaService) {

  }

  ngOnInit() {
    this.kafkaService.kafka.subscribe((data) => {
      this.parseData(data);
    });
  }

  parseData(data: any) {
    let robot = this.filterRobots(data);
    robot.name = data.beat.name;
    robot.platform = { name: data.host.os.name, version: data.host.os.version };
    if (data.system) {
      if (data.system.memory) {
        if (data.system.memory.free) {
          robot.ram.free = data.system.memory.free;
        }
        if (data.system.memory.total) {
          robot.ram.total = data.system.memory.total;
        }
        if (data.system.memory.used) {
          if (data.system.memory.used.bytes) {
            robot.ram.used = data.system.memory.used.bytes;
          }
        }
      }
      if (data.system.filesystem && (!data.system.filesystem.type || data.system.filesystem.type === 'fixed' ||
       data.system.filesystem.type === 'apfs')) {
        if (data.system.filesystem.total) {
          robot.disk.total = data.system.filesystem.total;

        }
        if (data.system.filesystem.used) {
          if (data.system.filesystem.used.bytes) {
            robot.disk.used = data.system.filesystem.used.bytes;
          }
          if (data.system.filesystem.used.pct) {
            robot.disk.pct = data.system.filesystem.used.pct;
          }
        }
        if (data.system.filesystem.available) {
          robot.disk.available = data.system.filesystem.available;
        }
      }
      if (data.system.cpu) {
        if (data.system.cpu.system && data.system.cpu.system.pct) {
          robot.cpu.pct = data.system.cpu.system.pct;
        }
      }
    }
  }

  filterRobots(data) {
    if (data && data.beat && data.beat.name) {
      let robotFilter = this.robots.filter((robot: any) => {
        return robot.name === data.beat.name;
      });
      if (robotFilter.length) {
        return robotFilter[0];
      }
    }
    let robotTemplate = {
      name: 'ROBOT-7485',
      platform: {
        name: 'Mac OS',
        version: '10.13.6',
      },
      cpu: {
        cores: 0,
        pct: 0,
      },
      ram: {
        used: 0,
        free: 0,
        total: 0,
      },
      disk: {
        total: 0,
        available: 0,
        used: 0,
        pct: 0,
      },
    };
    this.robots.push(robotTemplate);
    return this.robots[this.robots.length - 1];
  }

}
