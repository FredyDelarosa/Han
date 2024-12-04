import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  name: string;
  type: string[];
  generation: number;
}

@Component({
  selector: 'app-update-dialog',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule, // Importar MatFormField
    MatInputModule, // Importar MatInput
    MatButtonModule, // Botones
  ],
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss'],
})
export class UpdateDialogComponent {
  pokemonForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.pokemonForm = this.fb.group({
      name: [data.name, Validators.required],
      type: [data.type, Validators.required],
      generation: [data.generation, [Validators.required, Validators.min(1)]],
    });
    
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const updatedData = {
      ...this.data,
      ...this.pokemonForm.value, // `type` ya es una cadena, no necesita procesamiento adicional
    };
    this.dialogRef.close(updatedData);
  }
  
  
}
