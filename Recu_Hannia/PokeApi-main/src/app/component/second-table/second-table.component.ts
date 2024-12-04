import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PokemonService, Pokemon } from '../../services/pokemon.service';
import { UpdateDialogComponent, DialogData } from '../update-dialog/update-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { AddPokemonDialogComponent } from '../add-pokemon-dialog/add-pokemon-dialog.component';

@Component({
  selector: 'app-second-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, HttpClientModule],
  templateUrl: './second-table.component.html',
  styleUrls: ['./second-table.component.scss'],
})
export class SecondTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'generation', 'actions'];
  dataSource = new MatTableDataSource<Pokemon>();

  constructor(private pokemonService: PokemonService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPokemonDialogComponent);
  
    dialogRef.afterClosed().subscribe((newPokemon) => {
      if (newPokemon) {
        this.pokemonService.addPokemon(newPokemon).subscribe((addedPokemon) => {
          this.dataSource.data = [...this.dataSource.data, addedPokemon];
          this.dataSource._updateChangeSubscription(); // Refresca la tabla
        });
      }
    });
  }

  // Cargar los Pokémon desde el servicio
  loadPokemons(): void {
    this.pokemonService.getPokemons().subscribe((data: Pokemon[]) => {
      this.dataSource.data = data; // Asignar datos al MatTableDataSource
    });
  }

  editPokemon(pokemon: Pokemon): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: { ...pokemon },
    });
  
    dialogRef.afterClosed().subscribe((result: Pokemon | undefined) => {
      if (result) {
        this.pokemonService.updatePokemon(result.id, result).subscribe((updatedPokemon) => {
          const index = this.dataSource.data.findIndex((p: Pokemon) => p.id === updatedPokemon.id);
          if (index !== -1) {
            this.dataSource.data[index] = updatedPokemon;
            this.dataSource._updateChangeSubscription(); // Refrescar la tabla
          }
        });
      }
    });
  }
  
  // Eliminar un Pokémon
  deletePokemon(id: number): void {
    this.pokemonService.deletePokemon(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((p: Pokemon) => p.id !== id);
      this.dataSource._updateChangeSubscription(); // Refrescar la tabla
    });
  }
}
