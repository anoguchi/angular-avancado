import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      <span style="display: block">{{ title }} app is running!</span>
      <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    </div>
    <h2>Here are some links to help you start: </h2>
    <ul>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/cli">CLI Documentation</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
      </li>
    </ul>
    
  `,
  styles: []
})
export class AppComponent implements OnInit {

  title = 'RXJS';


  ngOnInit(): void {
    // nome correto
    this.minhaPromisse('Beto').then(result => console.log(result));
    // nome errado
    this.minhaPromisse('José').then(result => console.log(result))
      .catch(erro => console.log(erro));

    // Com observable/subscribe
    this.minhaObservable('Beto').subscribe({
      next: (next) => {
        console.log(next);
      },
      error: (erro) => {
        console.error(erro);
      },
      complete: () => {
        console.info('Observable Completo')
      }
    })
    /* Melhor jeito com observer. Para ter observer(conjunto de instruções 
       para fazer em cada situação), precisamos ter observable e subscribe. 
       */
    const observer = {
      next: (valor: string) => console.log('Next:', valor),
      error: (erro: string) => console.log('Erro:', erro),
      complete: () => console.log('FIM!')
    }
    const obs = this.minhaObservable('Beto');
    obs.subscribe(observer)



    const observerUsuario = {
      next: (valor: Usuario) => console.log('Next:', valor),
      error: (erro: string) => console.log('Erro:', erro),
      complete: () => console.log('FIM!')
    }
    const obsUsuario = this.usuarioObservable('Admin', 'admin@admin.com');
    const subs = obsUsuario.subscribe(observerUsuario)

    setTimeout(() => {
      subs.unsubscribe();
      console.log('Conexão fechada: ' + subs.closed);
    }, 3500);
  }




  // Promisse que recebe uma string e trabalha com alguma validação de dado
  minhaPromisse(nome: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (nome === "Beto") {
        setTimeout(() => {
          resolve(`Seja bem vindo! ${nome}`)
        }, 1000);
      }
      else {
        reject('Ops! Deu erro!')
      }
    })
  }

  // Observable
  minhaObservable(nome: string): Observable<string> {
    return new Observable(subscriber => {
      if (nome === 'Beto') {
        subscriber.next(`Olá ${nome}`);
        subscriber.next('Olá novamente!');
        setTimeout(() => {
          subscriber.next('Olá powrrraaaaa!');
        }, 1000);
        // Complete acaba com a comunicação
        subscriber.complete();
      } else {
        subscriber.error('Opa! Deu erro.')
      }
    })
  }

  // Observable
  usuarioObservable(nome: string, email: string): Observable<Usuario> {
    return new Observable(subscriber => {
      if (nome === 'Admin') {
        let usuario = new Usuario(nome, email);
        setTimeout(() => {
          subscriber.next(usuario);
        }, 1000);
        setTimeout(() => {
          subscriber.next(usuario);
        }, 1000);
        setTimeout(() => {
          subscriber.next(usuario);
        }, 3000);
        setTimeout(() => {
          subscriber.next(usuario);
        }, 4000);
        setTimeout(() => {
          subscriber.complete();
        }, 5000);
      } else {
        subscriber.error('Opa! Deu erro.')
      }
    })
  }
}

export class Usuario {
  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
  }

  nome: string
  email: string;
}
