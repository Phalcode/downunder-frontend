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
    if (!target.value || Number.parseInt(target.value) < 1) {
      target.value = "";
      this.control.viewToModelUpdate(Number.parseInt(this.defaultVal));
    }
  }
}
