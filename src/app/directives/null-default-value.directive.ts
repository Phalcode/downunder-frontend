import { Directive, ElementRef, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "input[appNullValue]"
})
export class NullDefaultValueDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener("input", ["$event.target"])
  onEvent(target: HTMLInputElement): void {
    this.control.viewToModelUpdate(target.value === "" ? target.defaultValue : target.value);
  }
}
