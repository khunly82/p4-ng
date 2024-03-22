import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {FloatLabelModule} from 'primeng/floatlabel';
import {AuthService} from '../../services/auth.service';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
  ) {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.form.value).subscribe({
      next: async ({username}) => {
        this.messageService.add({severity: 'info', summary: `Welcome ${username}`});
        await this.router.navigate(['/game']);
      },
      error: (error) => {
        this.messageService.add({severity: 'error', summary: error.error});
        this.isLoading = false;
      },
    })
  }
}
