import { HttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { CreateComponent } from "./create.component";

describe("CreateComponent", () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  const httpMock = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [CreateComponent],
      providers: [{ provide: HttpClient, useValue: httpMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
