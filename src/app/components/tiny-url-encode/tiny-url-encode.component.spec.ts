import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyUrlEncodeComponent } from './tiny-url-encode.component';

describe('TinyUrlEncodeComponent', () => {
  let component: TinyUrlEncodeComponent;
  let fixture: ComponentFixture<TinyUrlEncodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TinyUrlEncodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinyUrlEncodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
