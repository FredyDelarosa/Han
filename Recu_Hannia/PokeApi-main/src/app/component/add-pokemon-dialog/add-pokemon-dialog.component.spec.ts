import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPokemonDialogComponent } from './add-pokemon-dialog.component';

describe('AddPokemonDialogComponent', () => {
  let component: AddPokemonDialogComponent;
  let fixture: ComponentFixture<AddPokemonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPokemonDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPokemonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
