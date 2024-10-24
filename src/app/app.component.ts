import {afterNextRender, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import type * as o1jsTypes from 'o1js';

declare var o1js: typeof o1jsTypes;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'angular-o1js-demo';

  constructor() {
    afterNextRender(async () => {
      const {Mina, PublicKey, fetchAccount} = o1js;
      const {Add} = await import('@hattyhattington17/add');
      // connect the Mina instance to testnet
      Mina.setActiveInstance(Mina.Network('https://api.minascan.io/node/devnet/v1/graphql'));
      // we've already deployed the Add contract on testnet at this address
      // https://minascan.io/devnet/account/B62qnTDEeYtBHBePA4yhCt4TCgDtA4L2CGvK7PirbJyX4pKH8bmtWe5
      const zkAppAddress = `B62qnTDEeYtBHBePA4yhCt4TCgDtA4L2CGvK7PirbJyX4pKH8bmtWe5`;
      await fetchAccount({publicKey: zkAppAddress});
      const zkApp = new Add(PublicKey.fromBase58(zkAppAddress));
      // Read state from the testnet Add contract
      console.log("Current num", zkApp.num.get().toString());

      // retrieve the injected mina provider if it exists todo: wrap this code in a try catch
      const mina = (window as any).mina;
      const walletKey: string = (await mina.requestAccounts())[0];
      console.log(`Injected mina provider address: ${walletKey}`);
      await fetchAccount({publicKey: PublicKey.fromBase58(walletKey)});
      console.log("Compiling Add");
      await Add.compile();
      console.log("Compiled Add");

      // send a transaction with the injected Mina provider
      const transaction = await Mina.transaction(async () => {
        await zkApp.update();
      });
      await transaction.prove();
      const {hash} = await (window as any).mina.sendTransaction({
        transaction: transaction.toJSON(),
      });

      // display the link to the transaction
      const transactionLink = `https://minascan.io/devnet/tx/${hash}`;
      console.log(`View transaction at ${transactionLink}`);
    });
  }
}
