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
                            <td>
                                <code>{{ input.type }}</code>
                            </td>
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
                            <td>
                                <code>{{ output.type }}</code>
                            </td>
                            <td>{{ output.description }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ng-container>
    `,
    styleUrls: ["./apis.component.scss"],
})
export class APIsComponent {
    @Input() inputs: Array<APIInputs>;
    @Input() outputs: Array<APIOutputs>;
}
