import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConnectableObservable } from 'rxjs';
import { Game } from '../models/Game';
import { GameServiceTsService } from '../services/game-service.ts.service';

@Component({
  selector: 'app-game',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  @Input() pagePerRec = 0;
  games!: Game[];
  currentIndex: number = 0;
  pageNo: number = 1;
  
  constructor(private gameSvc: GameServiceTsService) {}
 
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(changes['pagePerRec'].currentValue);
    if(changes['pagePerRec'].currentValue == null)
      this.pagePerRec = 10;
    else
      this.pagePerRec = changes['pagePerRec'].currentValue;

    this.gameSvc.getGames(this.pagePerRec, this.currentIndex).subscribe((resp)=> {
      console.log(resp);
      this.games = resp;
    })
  }

  nextPage(){
    this.pageNo++;
    this.currentIndex = this.currentIndex + this.pagePerRec;
    this.gameSvc.getGames(this.pagePerRec, this.currentIndex).subscribe((resp)=> {
      console.log(resp);
      this.games = resp;
    })
  }

  previousPage(){
    this.pageNo--;
    this.currentIndex = this.currentIndex - this.pagePerRec;
    this.gameSvc.getGames(this.pagePerRec, this.currentIndex).subscribe((resp)=> {
      console.log(resp);
      this.games = resp;
    })
  }

  ngOnInit(): void {
      console.log("pagePerRec> " + this.pagePerRec);
      if(this.pagePerRec ==null)
        this.pagePerRec = 10;
      console.log(this.pagePerRec)
      this.gameSvc.getGames(this.pagePerRec, this.currentIndex).subscribe((resp)=> {
        console.log(resp);
        this.games = resp;
        //console.log(this.games.length);
      })
  }
}
