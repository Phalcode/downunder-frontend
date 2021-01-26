import { HttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { JoinComponent } from "./join.component";

describe("JoinComponent", () => {
  let component: JoinComponent;
  let fixture: ComponentFixture<JoinComponent>;
  const httpMock = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [JoinComponent],
      providers: [{ provide: HttpClient, useValue: httpMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
