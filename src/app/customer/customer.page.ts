import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { PostProvider } from 'src/providers/post-provider';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  customers: any = [];
  limit: number = 10;
  start = 0;

  anggota: any
  username: string

  constructor(private router: Router, 
    private postProvider: PostProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.customers = [];
    this.start = 0;
    this.loadCostumer();
    this.storage.get('session_storage').then((res)=>{
      this.anggota = res;
      this.username = this.anggota.username
    })
  }

  async logout() {
    this.storage.clear();
    const toast = await this.toastCtrl.create({
      message: 'Sessão terminada',
      duration: 2000
    });
    toast.present();
    this.router.navigate(['/login'])
  }

  doRefresh(event) {
    setTimeout(() =>{
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  loadData(event:any) {
    this.start += this.limit;
    this.loadCostumer().then(() => {
      event.target.complete()
    })
  }

  addCustomer() {
    this.router.navigate(['/addcustomer'])
  }

  updateCustomer(id, name, desc, address, email, phone, gender) {
    this.router.navigate(['/updatecustomer/' + id +'/'+ name +'/'+ desc + '/' + address +'/'+ email +'/'+ phone + '/' + gender])
  }

  showCustomer(id, name, desc, address, email, phone, gender) {
    this.router.navigate(['/showcustomer/'  + id +'/'+ name +'/'+ desc + '/' + address +'/'+ email +'/'+ phone + '/' + gender])
  }

  delCustomer(id) {
    let body = {
      action: 'delete',
      id: id
    };
    this.postProvider.postData(body, 'api.php').subscribe(data => {
      this.ionViewWillEnter();
    });
  }

  loadCostumer() {
    return new Promise(resolve => {
      
      let body = {
        action: 'getdata',
        limit: this.limit,
        start: this.start
      };
      this.postProvider.postData(body, 'api.php').subscribe(data => {
        if(data.result) {
          for(let customer of data.result) {
           this.customers.push(customer)
        }
        }
        
        resolve(true);
      });
    });
  }

}
