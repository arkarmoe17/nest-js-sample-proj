import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable() 
export class CatsService {
    private readonly cats : Cat[]= [];

    // create 
    create(cat : Cat){
        this.cats.push(cat)
    }

    // find all 
    findAll(): Cat[]{
        return this.cats;
    }

   
}
