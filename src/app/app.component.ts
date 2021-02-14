import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movableBoxGenerator';
  squaresArray : any[] = []
  id=1
  squares = ""
  highlighted = null
  @ViewChild('container') container: ElementRef;

  constructor(private _elementRef : ElementRef){}

  addSquare(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
    }
    var square = {
                   'key' : "key"+this.id,
                   'data' : '<div id="key'+this.id+'" style="padding:30px;height:80px;width:80px;background-color:'
                  +color+'; position:fixed; display:inline-block; z-index:'
                  +this.id+'; margin-left:'+Math.floor(Math.random() * (1000 - 0 + 1))+
                  'px; margin-top:'+Math.floor(Math.random() * (400 - 0 + 1))+'px;">'+this.id+'</div>'};
    this.squaresArray.push(square)
    this.squaresArray.forEach(e=>{
      this.squares += e.data;
    })
    this.container.nativeElement.innerHTML = this.squares;
    for(i=1;i<=this.id;i++){
      if(this._elementRef.nativeElement.querySelector('#key'+i)!=null){
    this._elementRef.nativeElement.querySelector('#key'+i).addEventListener('click', this.highlight.bind(this));
      }
    }
    this.squares = ""
    this.id++;
  }

  highlight(id){
    if(this.highlighted != null){
      let domElement = this._elementRef.nativeElement.querySelector(`#`+this.highlighted);  
      domElement.style.border = "none";
    this.highlighted = id.srcElement.attributes.id.value
    domElement = this._elementRef.nativeElement.querySelector(`#`+this.highlighted);
   domElement.style.border = "5px solid black";
    }
    else{
      this.highlighted = id.srcElement.attributes.id.value
    let domElement = this._elementRef.nativeElement.querySelector(`#`+this.highlighted);
   domElement.style.border = "5px solid black";
    }
  }

  @HostListener('document:keyup.delete', ['$event'])
  onDeleteComponent(event: KeyboardEvent) {
   if(this.highlighted != null){
     let index = null
    this.squaresArray.find((e,i)=>{
        index = i
        return e.key == this.highlighted
      })
     this.squaresArray.splice(index,1) 
     this.squares = ""
     this.squaresArray.forEach(e=>{
      this.squares += e.data;
    })
    this.container.nativeElement.innerHTML = this.squares;
    for(var i=1;i<this.id;i++){
      if(this._elementRef.nativeElement.querySelector('#key'+i)!=null){
        this._elementRef.nativeElement.querySelector('#key'+i).addEventListener('click', this.highlight.bind(this));
      }
    }
    this.highlighted = null
     
   }
}

@HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(this.highlighted!=null){
      if(event.key == 'a'){
        var pixel = this._elementRef.nativeElement.querySelector('#'+this.highlighted).style.marginLeft;
        var newPixel = Number(pixel.substring(0,pixel.length - 2)) - 1;
        this._elementRef.nativeElement.querySelector('#'+this.highlighted).style.marginLeft = newPixel + "px";
      }
      if(event.key == 'd'){
        var pixel = this._elementRef.nativeElement.querySelector('#'+this.highlighted).style.marginLeft;
        var newPixel = Number(pixel.substring(0,pixel.length - 2)) + 1;
        this._elementRef.nativeElement.querySelector('#'+this.highlighted).style.marginLeft = newPixel + "px";
      }
      if(event.key == 's'){
        var pixel = this._elementRef.nativeElement.querySelector('#'+this.highlighted).style.marginTop;
        var newPixel = Number(pixel.substring(0,pixel.length - 2)) + 1;
        this._elementRef.nativeElement.querySelector('#'+this.highlighted).style.marginTop = newPixel + "px";
      }
      if(event.key == 'w'){
        var pixel = this._elementRef.nativeElement.querySelector('#'+this.highlighted).style.marginTop;
        var newPixel = Number(pixel.substring(0,pixel.length - 2)) - 1;
        this._elementRef.nativeElement.querySelector('#'+this.highlighted).style.marginTop = newPixel + "px";
      }

    }
  }
}
