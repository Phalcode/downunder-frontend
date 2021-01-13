import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "input[appDefaultValue]"
})
export class NullToDefaultDirective {
  @Input() defaultVal: string;

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener("input", ["$event.target"])
  onEvent(target: HTMLInputElement): void {
    console.log(this.defaultVal);
    this.control.viewToModelUpdate(target.value === "" ? Number.parseInt(this.defaultVal) : Number.parseInt(target.value));
  }
}
