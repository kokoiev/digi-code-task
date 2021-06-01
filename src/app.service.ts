import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
   getAll() {
        return [{id: 1, name: 'uri....'}]
    }
}