import { async, TestBed } from '@angular/core/testing';
import { ClientModule } from './client.module';

describe('ClientModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ClientModule).toBeDefined();
  });
});
