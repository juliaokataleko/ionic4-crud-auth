import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PostProvider } from '../../providers/post-provider';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = "";
  password: string = "";
  confirm_password: string = "";
  email: string = "";

  constructor(private router: Router, 
    private postProvider: PostProvider,
    private toastController: ToastController
    ) { }

  ngOnInit() {
  }

  formLogin(){
    this.router.navigate(['/login']);
  }

  async registerUser() {
      if(this.username == "" || this.password == "") {
        const toast = await this.toastController.create({
          message: 'Preencha todos os campos correctamente.',
          duration: 2000
        });
        toast.present();
      } else if (this.password != this.confirm_password) {
        const toast = await this.toastController.create({
          message: 'Confirme sua Palavra-passe por favor.',
          duration: 2000
        });
      } else {
      let body = {
        action: 'register',
        username : this.username,
        email : this.email,
        password : this.password
      };
      this.postProvider.postData(body, 'api.php').subscribe(async data => {
        let alertmsg = data.msg;
        if(data.success) {
          this.router.navigate(['/login']);
          const toast = await this.toastController.create({
            message: 'Parabéns!!! Sua conta foi criada com sucesso.',
            duration: 2000
          });
          toast.present();
        }else {
          const toast = await this.toastController.create({
            message: alertmsg,
            duration: 2000
          });
          toast.present();
        }
        
      });

    } // if everything is correct end here...
  }

}
