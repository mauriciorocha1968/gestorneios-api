import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<div><h1>Gestão de Torneios</h1><h2>Versão: 1.0.0.1</h2></div>';
  }
}
