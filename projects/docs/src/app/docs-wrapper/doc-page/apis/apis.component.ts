import { Component, Input } from "@angular/core";

@Component({
    selector: "app-doc-apis",
    template: `
        <ng-container *ngIf="inputs?.length">
            <h3>Inputs</h3>
            <div class="card">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Inputs</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let input of inputs">
                            <td>{{ input.name }}</td>
                            <td class="text-primary">{{ input.type }}</td>
                            <td>{{ input.description }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ng-container>

        <ng-container *ngIf="outputs?.length">
            <h3>Outputs</h3>
            <div class="card">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Outputs</th>
                            <th>Params</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let output of outputs">
                            <td>{{ output.name }}</td>
                            <td class="text-primary">{{ output.type }}</td>
                            <td>{{ output.description }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ng-container>
    `,
    styles: [
        `
            .card {
                border-radius: 10px;
                overflow: hidden;
                margin-bottom: 1rem;
            }
            .card table {
                margin: 0;
            }
        `,
    ],
})
export class APIsComponent {
    @Input() inputs: Array<APIInputs>;
    @Input() outputs: Array<APIOutputs>;
}
