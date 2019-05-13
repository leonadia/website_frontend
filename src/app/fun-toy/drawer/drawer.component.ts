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
  mousePos = { x:0, y:0 };
  constructor() { }

  ngOnInit() {

    this.ctx =   this.canvas.nativeElement.getContext('2d');

    this.canvas.nativeElement.height = window.innerHeight-200;
    this.canvas.nativeElement.width = window.innerWidth;

    let draw = (e) => {
      if(!this.painting) return;

      this.ctx.lineWidth = 10;
      this.ctx.lineCap = "round"
      this.ctx.lineTo(e.clientX, e.clientY-180);
      this.ctx.stroke()
      this.ctx.beginPath();
      this.ctx.moveTo(e.clientX, e.clientY-180);
    }

    let getTouchPos = (dom, touchEvent) => {
      var rect = dom.nativeElement.getBoundingClientRect();
      return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
      };
    }

    this.canvas.nativeElement.addEventListener('mousedown', (e) =>{
      this.painting = true;
      draw(e);
    })
    this.canvas.nativeElement.addEventListener('mouseup', ()=>{
      this.painting = false;
      this.ctx.beginPath();
    })
    this.canvas.nativeElement.addEventListener('mousemove', draw);

    this.canvas.nativeElement.addEventListener('touchstart', (e) => {
      this.mousePos = getTouchPos(this.canvas, e);
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      this.canvas.nativeElement.dispatchEvent(mouseEvent);
    },false)
    
    this.canvas.nativeElement.addEventListener("touchend", (e) => {
      var mouseEvent = new MouseEvent("mouseup", {});
     this.canvas.nativeElement.dispatchEvent(mouseEvent);
    }, false);

    this.canvas.nativeElement.addEventListener("touchmove", (e) => {
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
    this.canvas.nativeElement.dispatchEvent(mouseEvent);
    }, false);

    
  }

  resetCanvas() {
    this.canvas.nativeElement.width = this.canvas.nativeElement.width;
    console.log("reset")
  }
}
