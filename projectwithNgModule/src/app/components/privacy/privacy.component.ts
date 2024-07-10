import { Component } from '@angular/core';
import { ApiService } from '../../Services/api.service';


@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
  public claims: any[] = [];
  constructor(private _repository: ApiService) { }
  ngOnInit(): void {
    this.getClaims();
  }
  public getClaims = () =>{
    this._repository.getUserClaims()
    .subscribe(res => {
      this.claims = res as [];
    },error=>{
      console.error(error);
    })
  }
}
