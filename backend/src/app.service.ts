import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private data = [
    {
      name: 'Sonu Sah',
      designation: 'Senior Software Engineer',
      phone: 9101469543,
      email: 'dev.sonusah@gmail.com',
    },
  ];

  getHello() {
    return this.data;
  }
}
