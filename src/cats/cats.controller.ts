import {
  BadRequestException, Body, Controller, Delete,
  ForbiddenException,
  Get, Header, HttpCode, HttpException, HttpStatus, NotFoundException, Param,
  ParseIntPipe, ParseUUIDPipe, Post, Put, Query, Redirect, Res, UseFilters, UseGuards
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat-dto';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/guards/roles.decorator';
import { delay, timeout } from 'rxjs';

@Controller('cats')
// @UseFilters(new HttpExceptionFilter()) // controller level
// @UseGuards(RolesGuard)
export class CatsController {

  // dependency injection
  constructor(private catService: CatsService) { }

  // create 
  // @Post()
  // @HttpCode(201) //204: no content
  // @Header('Cache-Control', 'none')
  // async create(@Body() catDto: CreateCatDto) {
  //   console.log('catDto: ', catDto);
  //   return this.catService.create(catDto);
  // }

  // Liberary specific approach
  // express response
  // @Post()
  // create(@Res() res: Response) {
  //   res.status(HttpStatus.CREATED).send();
  // }

  // exception filter 
  @Post()
  @Roles(['admin','user'])
  async create(@Body() catDto: CreateCatDto) {
    console.log('catDto: ', catDto);
    return this.catService.create(catDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    console.log("Fetching all the cats.")
    return this.catService.findAll();
  }

  // @Get()
  // findAll(@Res({passthrough : true}) res: Response) {
  //   res.status(HttpStatus.OK).json([]); 
  // }



  // wild card like abcd, ab_cd, abecd
  @Get('ab*cd')
  findAllList() {
    return 'This route uses a wildcard';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // @Get(':id')
  // findOne(@Param() params : any) : string {
  //     console.log('param: ', params)
  //     return `This action returns a #${params.id} cat`
  // }

  @Get()
  findOne(@Query('id', ParseIntPipe) id: number): string {
    console.log('id: ', id)
    return `This action returns a #${id} cat`
  }

  @Get(':uuid')
  async findOneByUuid(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return `This action return a #${uuid} cat`
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() catDto: UpdateCatDto) {
    console.log(` id: ${id} | data: ${JSON.stringify(catDto)}`);
    return `Update the cat data.`
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    console.log(`deleted by id: ${id}`);
    return `This action removes a #${id} cat`
  }

}
