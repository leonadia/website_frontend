import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;
  painting = false;
  constructor() { }

  ngOnInit() {

    this.ctx =   this.canvas.nativeElement.getContext('2d');

    this.canvas.nativeElement.height = window.innerHeight;
    this.canvas.nativeElement.width = window.innerWidth;

    let draw = (e) => {
      if(!this.painting) return;

      this.ctx.lineWidth = 10;
      this.ctx.lineCap = "round"
      this.ctx.lineTo(e.clientX, e.clientY-80);
      this.ctx.stroke()
      this.ctx.beginPath();
      this.ctx.moveTo(e.clientX, e.clientY-80);
      console.log(e.clientX, e.clientY)
    }

    this.canvas.nativeElement.addEventListener('mousedown', (e) =>{
      this.painting = true;
      draw(e)
    })
    this.canvas.nativeElement.addEventListener('mouseup', ()=>{
      this.painting = false;
      this.ctx.beginPath();
    })
    this.canvas.nativeElement.addEventListener('mousemove', draw);

    
  }


}
