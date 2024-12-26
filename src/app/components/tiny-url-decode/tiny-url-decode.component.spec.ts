import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyUrlDecodeComponent } from './tiny-url-decode.component';

describe('TinyUrlDecodeComponent', () => {
  let component: TinyUrlDecodeComponent;
  let fixture: ComponentFixture<TinyUrlDecodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TinyUrlDecodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinyUrlDecodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
