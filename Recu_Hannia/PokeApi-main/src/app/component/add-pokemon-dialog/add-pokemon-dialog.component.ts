import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-add-pokemon-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './add-pokemon-dialog.component.html',
  styleUrls: ['./add-pokemon-dialog.component.scss'],
})
export class AddPokemonDialogComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddPokemonDialogComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      generation: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
