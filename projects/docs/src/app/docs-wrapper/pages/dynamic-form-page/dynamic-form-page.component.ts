import { Component } from "@angular/core";
import {
    FormService,
    DynamicFormOption,
    RuleType,
    FollowUpItem,
    DynamicFormSection,
    DynamicFormType,
    DynamicFormItem,
    Rule,
} from "projects/ng-components/public-api";
import { ExtendedFormGroup } from "@sebgroup/ng-components/dynamic-form/model/custom-classes/extended-form-group";

export enum ComponentType {
    None,
    Card,
    Text,
    RadioTextBox,
    CheckBox,
    Number,
    Date,
}

export enum QuestionOptionType {
    None,
    Card,
    Input,
    Radio,
    CheckBox,
    Group,
}

@Component({
    selector: "app-dynamic-form-page",
    templateUrl: "./dynamic-form-page.component.html",
    styleUrls: ["./dynamic-form-page.component.scss"],
    providers: [FormService],
})
export class DynamicFormPageComponent {
    importString: string = require("!raw-loader!@sebgroup/ng-components/dynamic-form/dynamic-form.component");
    sizeList: DynamicFormOption<any>[] = [
        { value: null, label: "default" },
        { value: "lg", label: "lg" },
        { value: "sm", label: "sm" },
    ];
    positionList: DynamicFormOption<any>[] = [
        { value: null, label: "default" },
        { value: "right", label: "right" },
        { value: "left", label: "left" },
    ];
    extendedFormGroup: ExtendedFormGroup;
    activeStep: number = 0;
    customDemo: boolean = false;

    cplFromGroup = [
        {
            id: "d0be9c91-3211-40a1-84a1-903133b07d7a",
            name: "Hög eller låg risk",
            text: "Hur tänker du om risk och möjlighet till avkastning när det gäller ditt pensionssparande?",
            description:
                "Att pensionsspara med högre risk innebär att sparandet har bättre möjligheter att växa, men att värdet kan gå mycket upp och ner fram tills du går i pension. Det finns också en risk att sparandet sjunker i värde.\n\nMed lägre risk svänger värdet på sparandet mindre, men du har inte möjlighet till samma avkastning som när du sparar med högre risk. Däremot minskar risken för att sparandet ska sjunka mycket i värde. \n",
            subTitle: "Placeringsrådgivning",
            shortDescription: "",
            optionType: 1,
            media: [
                {
                    id: "c2999eba-8d4c-4649-965c-7aacaa9960d0",
                    url: "https://seb-external.creo.se/i/tgO5DeWBQSjGfaUrPcZyxA",
                    kind: 1,
                    mimeType: null,
                    name: null,
                    description: "Så kan du tänka om risk (01:39)",
                },
            ],
            answerAlternatives: [
                {
                    id: "116469b6-afed-42ff-b697-efecb594ab08",
                    text: "Jag vill få möjlighet till högre pension, även om det innebär högre risk",
                    reasonLabel: null,
                    category: null,
                    value: null,
                    order: 1,
                    type: 1,
                    configuration: '{\n  "Version": "1.0.0",\n  "Type": 1,\n  "Control": {}\n}',
                    media: [],
                    rules: [],
                    confirm: null,
                    followupQuestions: [],
                },
                {
                    id: "fcda0671-bd08-4349-b20a-e13cd200e499",
                    text: "Jag vill att sparandet får möjlighet att växa, men risken får inte vara för hög",
                    reasonLabel: null,
                    category: "",
                    value: null,
                    order: 2,
                    type: 1,
                    configuration: '{\n  "Version": "1.0.0",\n  "Type": 1,\n  "Control": {}\n}',
                    media: [],
                    rules: [],
                    confirm: null,
                    followupQuestions: [],
                },
                {
                    id: "8a4c0290-608b-4af7-b1a9-af3d7b1d6a57",
                    text: "Jag vill att risken är låg, även om sparandet får sämre möjlighet att växa",
                    reasonLabel: null,
                    category: null,
                    value: null,
                    order: 3,
                    type: 1,
                    configuration: '{\n  "Version": "1.0.0",\n  "Type": 1,\n  "Control": {}\n}',
                    media: [],
                    rules: [],
                    confirm: null,
                    followupQuestions: [],
                },
            ],
            groupQuestionItems: [],
        },
        {
            id: "a8566d0f-0530-4bb8-96b0-534c3f6a4f2c",
            name: "Hur hög risk?",
            text: "Hur viktig är möjligheten till högre pension?",
            description: "",
            subTitle: "Placeringsrådgivning",
            shortDescription: "",
            optionType: 1,
            media: [],
            answerAlternatives: [
                {
                    id: "cd6f3d73-1656-4395-834d-10d3d5f250b7",
                    text: "Mycket viktig och jag är beredd på att spara med hög risk",
                    reasonLabel: null,
                    category: null,
                    value: null,
                    order: 1,
                    type: 1,
                    configuration: '{\n  "Version": "1.0.0",\n  "Type": 1,\n  "Control": {}\n}',
                    media: [],
                    rules: [],
                    confirm: null,
                    followupQuestions: [],
                },
                {
                    id: "310da37d-c86f-4753-964b-77cf5dcc97da",
                    text: "Viktigt men risken får inte vara för hög",
                    reasonLabel: null,
                    category: "",
                    value: "",
                    order: 2,
                    type: 1,
                    configuration: '{\n  "Version": "1.0.0",\n  "Type": 1,\n  "Control": {}\n}',
                    media: [],
                    rules: [],
                    confirm: null,
                    followupQuestions: [],
                },
            ],
            groupQuestionItems: [],
        },
        {
            id: "98f8bbd3-3f2c-41e3-a2a0-502806108dd4",
            name: "Kortsiktig risk",
            text: "Tänk dig att du idag har ett pensionssparande som är värt 100 000 kronor. Är du bekväm med att ha hög risk i det sparandet?",
            description: "",
            subTitle: "Placeringsrådgivning",
            shortDescription: "",
            optionType: 1,
            media: [
                {
                    id: "56798cd4-6dda-4416-9f78-3d30dbb789b0",
                    url: "/api/v1/media/56798cd4-6dda-4416-9f78-3d30dbb789b0/form/5a2118b7-90d5-4018-a9e5-f4bf0f490529",
                    kind: 0,
                    mimeType: "image/png",
                    name: "main",
                    description:
                        "Här ser du hur det sparandet skulle kunna utvecklas på ett år med tre olika risknivåer. Den markerade raden visar det spann som tror att sparandet skulle hamna inom utifrån hur du har svarat hittills.",
                },
            ],
            answerAlternatives: [
                {
                    id: "98a2e0ce-e46b-43e1-8593-7d78a6e954a6",
                    text: "Ja, jag är bekväm med den risknivån",
                    reasonLabel: null,
                    category: null,
                    value: null,
                    order: 1,
                    type: 1,
                    configuration: '{\n  "Type": 1\n}',
                    media: [],
                    rules: [],
                    confirm: null,
                    followupQuestions: [],
                },
                {
                    id: "2cf8ca43-aeee-4fa7-b3d3-1cd7e2e7a365",
                    text: "Nej, jag vill ha en annan risknivå",
                    reasonLabel: null,
                    category: "",
                    value: null,
                    order: 2,
                    type: 1,
                    configuration: '{\n  "Type": 1,\n  "Control": {\n    "Title": "-",\n    "Text": "-",\n    "Deny": "Close"\n  }\n}',
                    media: [],
                    rules: [],
                    confirm: {
                        title: "Ändra dina svar",
                        message: "Om du vill spara med en annan risknivå behöver du gå tillbaka och se över dina svar.",
                        accept: null,
                        deny: "Stäng",
                    },
                    followupQuestions: [],
                },
            ],
            groupQuestionItems: [],
        },
        {
            id: "8096e8ae-8eb8-4008-ba34-b97404043068",
            name: "Olika riskstrategier",
            text: "Tänk dig att du har 3 år kvar till hela din pension har betalats ut och ett pensionssparande på 100 000 kronor. Vilken strategi skulle du vara mest bekväm med för det här pensionssparandet?",
            description:
                '{"Heading": "Läs mer om riskstrategierna","Texts": [{"Subheading": "Vad är en riskstrategi?","Content": "När du sparar med SEB Bot Advisor får du en personlig riskstrategi. Riskstrategin kan var vara låg, medellåg, medel, medelhög eller hög. Det är den här strategin som avgör hur hög risken i sparandet blir och hur snabbt risken sänks. Oavsett strategi är risken högre när du har lång tid kvar till sista utbetalningen från sparandet, men sänks gradvis ju äldre du blir. Vilken riskstrategi som vi tillämpar för ditt sparande beror bland annat på hur du svarar på de här frågorna.","Image": "high-risk"},{"Subheading": "Så funkar prognoserna","Content": "&lt;p&gt;När vi räknar på hur sparandet kan utvecklas över tid använder vi oss av avancerade beräkningsmodeller. I frågan utgår vi från ett påhittat sparande och visar ett pessimistiskt, ett optimistiskt och ett förväntat värde för tre olika riskstrategier efter ett visst antal år. Vid den tidpunkten tror vi att värdet på sparandet kommer att ligga nära det förväntade värdet, men&lt;/p&gt;&lt;ul&gt;&lt;li&gt;det är 30 procents sannolikt att sparandet utvecklas till det optimistiska värdet eller mer&lt;/li&gt;&lt;li&gt;det är mindre än 5 procents sannolikhet att sparandet utvecklas till det pessimistiska värdet eller mindre.&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;I exemplen räknar vi med att värdet på sparandet fortsätter att förändras under spartiden.Däremot räknar vi inte med framtida inbetalningar.&lt;/p&gt;","Image": null}]}',
            subTitle: "Placeringsrådgivning",
            shortDescription: "",
            optionType: 1,
            media: [
                {
                    id: "3164e266-039f-4ac1-8b87-31c2a29ba2e9",
                    url: "/api/v1/media/3164e266-039f-4ac1-8b87-31c2a29ba2e9/form/5a2118b7-90d5-4018-a9e5-f4bf0f490529",
                    kind: 0,
                    mimeType: "image/png",
                    name: "main",
                    description: "I tabellen ser du hur mycket du skulle kunna få utbetalt per månad med olika strategier.",
                },
                {
                    id: "a6f876e3-000c-4c6b-8f19-af8e548f3439",
                    url: "/api/v1/media/a6f876e3-000c-4c6b-8f19-af8e548f3439/form/5a2118b7-90d5-4018-a9e5-f4bf0f490529",
                    kind: 0,
                    mimeType: "image/png",
                    name: "high-risk",
                    description: "",
                },
            ],
            answerAlternatives: [
                {
                    id: "810ef431-5a37-4adb-90a5-6f0e55b259ca",
                    text: "Jag är bekväm med en strategi med hög risk",
                    reasonLabel: null,
                    category: "RISK_WILLINGNESS",
                    value: "5",
                    order: 1,
                    type: 1,
                    configuration: '{\n  "Version": "1.0.0",\n  "Type": 1,\n  "Control": {}\n}',
                    media: [],
                    rules: [],
                    confirm: null,
                    followupQuestions: [],
                },
                {
                    id: "3f4fd955-f855-41b7-8efd-8847ca54c8fd",
                    text: "Jag är bekväm med en strategi med medelhög risk",
                    reasonLabel: null,
                    category: "RISK_WILLINGNESS",
                    value: "4",
                    order: 2,
                    type: 1,
                    configuration: '{\n  "Version": "1.0.0",\n  "Type": 1,\n  "Control": {}\n}',
                    media: [],
                    rules: [],
                    confirm: null,
                    followupQuestions: [],
                },
            ],
            groupQuestionItems: [],
        },
        {
            id: "f404a81a-ad83-47cb-aa36-922c3d7cae52",
            name: "Hållbart sparande",
            text: "Vill du pensionsspara med hållbart fokus?",
            description:
                '{"Heading":"Läs mer om att spara hållbart","Texts":[{"Subheading":"Vad innebär det att spara med hållbart fokus?","Content":"När vi väljer fonder till ditt sparande tittar vi på flera saker, till exempel hur vi tror att fonden kommer att utvecklas framåt och om fonden är hållbar. Därefter gör vi en samlad bedömning vilken fond som är mest lämplig för dig. Om du väljer att spara med hållbart fokus kommer vi att prioritera hållbarhet ännu mer, även i de fall vi tror att en annan fond kan ge lite mer i avkastning.","Image":null},{"Subheading":"Hur påverkas pensionen av att spara hållbart?","Content":"Att spara hållbart hindrar inte möjligheten att få en god avkastning. Tvärtom tror vi att företag som tar hänsyn till hållbarhet när de fattar sina beslut är de som klarar sig bäst framöver.","Image":null},{"Subheading":"Vad innebär hållbart sparande?","Content":"&lt;p&gt;Totalt har vi närmare 1 miljon pensionssparare, vilket ger oss en fantastisk möjlighet att påverka många företag runtom i världen i en mer hållbar riktning. När du sparar i våra hållbara fonder får du också möjlighet att tycka till om vilka av FN:s hållbarhetsmål vi ska fokusera på.&lt;/p&gt; &lt;p&gt;Alla våra fonder utesluter företag som inte lever upp till våra krav på hållbarhet. I våra etiska och hållbara fonder går vi dessutom ett steg längre och investerar i företag som arbetar för att minska sin klimatpåverkan. De hållbara och etiska fonderna påverkar också aktivt hållbarhetsarbetet i företagen de investerar i. Externa fonder som vi erbjuder utvärderar vi löpande ur ett ekonomiskt, miljömässigt och socialt perspektiv.&lt;/p&gt;","Image":null}]}',
            subTitle: "Placeringsrådgivning",
            shortDescription:
                "När vi väljer fonder till ditt sparande letar vi i första hand efter hållbara fonder. Om du dessutom har en hållbar profil prioriterar vi hållbarhet ännu mer. Hållbara fonder tar hänsyn till olika miljömässiga och sociala aspekter när de investerar i företag.",
            optionType: 1,
            media: [
                {
                    id: "c5f56e2e-e8f9-4944-83db-13913e4785fe",
                    url: "https://seb-external.creo.se/i/ve6LxUx7pESgXjKOYyRtmg",
                    kind: 1,
                    mimeType: null,
                    name: null,
                    description: "Så kan du påverka med ditt sparande (01:33)",
                },
            ],
            answerAlternatives: [
                {
                    id: "d8be6bcc-1ef3-460c-b58d-b68f73ee5a95",
                    text: "Ja, jag vill spara med hållbart fokus",
                    reasonLabel: "",
                    category: "SUSTAINABILITY",
                    value: "1",
                    order: 1,
                    type: 1,
                    configuration: '{\n  "Version": "1.0.0",\n  "Type": 1,\n  "Control": {}\n}',
                    media: [],
                    rules: [],
                    confirm: null,
                    followupQuestions: [],
                },
                {
                    id: "8b1870cd-2587-4549-8f79-88ba46e3cdd7",
                    text: "Nej, jag vill inte spara med hållbart fokus",
                    reasonLabel: null,
                    category: "SUSTAINABILITY",
                    value: "0",
                    order: 2,
                    type: 1,
                    configuration: '{\n  "Version": "1.0.0",\n  "Type": 1,\n  "Control": {}\n}',
                    media: [],
                    rules: [],
                    confirm: null,
                    followupQuestions: [],
                },
            ],
            groupQuestionItems: [],
        },
        {
            id: "001b2885-4960-4a64-835c-48ff20b3f3d7",
            name: "",
            text: "Vi behöver veta mer om din ekonomi",
            description:
                "För att vi ska kunna ge råd som passar dig, behöver vi ställa några frågor om din ekonomi. Ju noggrannare du svarar, desto bättre råd kan du få. Det är viktigt att du svarar på alla frågor så att du inte får råd på felaktiga grunder.",
            subTitle: "",
            shortDescription: "",
            optionType: 0,
            media: [],
            answerAlternatives: [],
            groupQuestionItems: [],
        },
        {
            id: "1b856337-9ba7-4186-a56d-a9c145fd851a",
            name: "Inkomst",
            text: "Hur stor är din månadsinkomst efter skatt?",
            description: "",
            subTitle: "Din ekonomi",
            shortDescription: "",
            optionType: 2,
            media: [],
            answerAlternatives: [
                {
                    id: "3add5cc7-4099-4ec7-bf5b-12d7a3e09b26",
                    text: "Din lön eller pension efter skatt en genomsnittlig månad",
                    reasonLabel: "Räkna även med bidrag och provision.",
                    category: "MONTHLY_INCOME",
                    value: "",
                    order: 1,
                    type: 5,
                    configuration:
                        '{\n  "InputType": "Number",\n  "IsRequired": true,\n  "Max": 1000000000,\n  "Min": 1,\n  "Version": "1.0.0",\n  "Type": 2,\n  "GroupLabel": "kr/mån",\n  "ErrorMessage": "Fyll i din månadsinkomst"\n}',
                    media: [],
                    rules: [
                        { ruleType: 0, value: null, message: "Fyll i din månadsinkomst" },
                        { ruleType: 2, value: "1", message: "Du behöver fylla i ett värde större än eller lika med" },
                        { ruleType: 3, value: "1000000000", message: "Värdet kan inte vara över" },
                    ],
                    confirm: null,
                    followupQuestions: [],
                },
            ],
            groupQuestionItems: [],
        },
        {
            id: "53532df5-586f-453b-a1a4-d409b6fd4a9b",
            name: "Kvar i månaden",
            text: "Hur mycket brukar du ha kvar efter att du har betalat alla viktiga utgifter?",
            description: "Räkna också med sådant som är viktigt för dig, till exempel restaurangbesök och sparande till resor.",
            subTitle: "Din ekonomi",
            shortDescription: "",
            optionType: 2,
            media: [],
            answerAlternatives: [
                {
                    id: "a6e8eabd-2f14-4b23-8a6d-8cb40b9f8a14",
                    text: "",
                    reasonLabel: "Kvar i månaden",
                    category: "MONTHLY_AMOUNT_LEFT",
                    value: null,
                    order: 1,
                    type: 5,
                    configuration:
                        '{\n  "InputType": "Number",\n  "IsRequired": true,\n  "Max": 100000000,\n  "Min": 1,\n  "Version": "1.0.0",\n  "Type": 2,\n  "GroupLabel": "kr/mån",\n  "ErrorMessage": "Fyll i hur mycket du brukar ha kvar i månaden"\n}',
                    media: [],
                    rules: [
                        { ruleType: 0, value: null, message: "Fyll i hur mycket du brukar ha kvar i månaden" },
                        { ruleType: 9, value: "3add5cc7-4099-4ec7-bf5b-12d7a3e09b26", message: "Värdet kan inte vara över" },
                        { ruleType: 2, value: "1", message: "Du behöver fylla i ett värde större än eller lika med" },
                        { ruleType: 3, value: "100000000", message: "Värdet kan inte vara över" },
                    ],
                    confirm: null,
                    followupQuestions: [],
                },
            ],
            groupQuestionItems: [],
        },
        {
            id: "c9205109-37e1-4b7d-82c3-d6a2a62dbfb2",
            name: "Tillgångar",
            text: "Lägg till dina tillgångar som du har hos eller utanför SEB.",
            description: "",
            subTitle: "Din ekonomi",
            shortDescription: "",
            optionType: 3,
            media: [],
            answerAlternatives: [
                {
                    id: "88e329bb-c2da-46e6-927b-04c1a4eb3714",
                    text: "Har du pengar på konton?",
                    reasonLabel: null,
                    category: "SAVING_AMOUNT",
                    value: null,
                    order: 1,
                    type: 3,
                    configuration:
                        '{\n  "InputType": "Number",\n  "IsRequired": false,\n  "Max": 1000000000,\n  "Min": 1,\n  "Version": "1.0.0",\n  "Type": 3,\n  "GroupLabel": "kr",\n  "FirstLabelTitle": "Ja",\n  "SecondLabelTitle": "Nej",\n  "Modal": {\n    "Title": "Pengar på konton",\n    "Description": "Räkna även med pengar som du har på konton hos SEB. Om du har ett konto tillsammans med någon fyller du i din del av värdet.",\n    "Label": "Värde"\n  },\n  "ErrorMessage": "Fyll i hur mycket du har på konton"\n}',
                    media: [],
                    rules: [
                        { ruleType: 3, value: "1000000000", message: "Värdet kan inte vara över" },
                        { ruleType: 2, value: "1", message: "Du behöver fylla i ett värde större än eller lika med" },
                    ],
                    confirm: null,
                    followupQuestions: [
                        {
                            id: "1b856337-9ba7-4186-a56d-a9c145fd851a",
                            name: "Inkomst",
                            text: "Pengar på konton",
                            description: "",
                            subTitle: "",
                            shortDescription: "",
                            optionType: 2,
                            media: [],
                            answerAlternatives: [
                                {
                                    id: "3add5cc7-4099-4ec7-bf5b-12d7a3e09b26",
                                    text: "Räkna även med pengar som du har på konton hos SEB. Om du har ett konto tillsammans med någon fyller du i din del av värdet.",
                                    reasonLabel: "Värde",
                                    category: "SAVING_AMOUNT",
                                    value: "",
                                    order: 1,
                                    type: 5,
                                    configuration:
                                        '{\n  "InputType": "Number",\n  "IsRequired": true,\n  "Max": 1000000000,\n  "Min": 1,\n  "Version": "1.0.0",\n  "Type": 2,\n  "GroupLabel": "kr/mån",\n  "ErrorMessage": "Fyll i din månadsinkomst"\n}',
                                    media: [],
                                    rules: [
                                        { ruleType: 0, value: null, message: "Value required" },
                                        { ruleType: 3, value: "1000000000", message: "Värdet kan inte vara över" },
                                        { ruleType: 2, value: "1", message: "Du behöver fylla i ett värde större än eller lika med" },
                                    ],
                                    confirm: null,
                                    followupQuestions: [],
                                },
                            ],
                            groupQuestionItems: [],
                        },
                    ],
                },
                {
                    id: "05e91ea8-ffcf-4f7a-bf33-cc7c72a3692e",
                    text: "Äger du fonder eller värdepapper?",
                    reasonLabel: "",
                    category: "SAVING_AMOUNT",
                    value: null,
                    order: 2,
                    type: 3,
                    configuration:
                        '{\n  "InputType": "Number",\n  "IsRequired": false,\n  "Max": 100000000,\n  "Min": 1,\n  "Version": "1.0.0",\n  "Type": 3,\n  "GroupLabel": "kr",\n  "FirstLabelTitle": "Ja",\n  "SecondLabelTitle": "Nej",\n  "Modal": {\n    "Title": "Fonder och värdepapper",\n    "Description": "Räkna även med fonder och värdepapper som du har hos SEB. Räkna inte med fonder och värdepapper som är tänkta till pensionen. Om du har sparandet tillsammans med någon fyller du i din del av värdet.",\n    "Label": "Värde"\n  },\n  "ErrorMessage": "Fyll i hur mycket du har i fonder och värdepapper"\n}',
                    media: [],
                    rules: [
                        { ruleType: 3, value: "100000000", message: "Värdet kan inte vara över" },
                        { ruleType: 2, value: "1", message: "Du behöver fylla i ett värde större än eller lika med" },
                    ],
                    confirm: null,
                    followupQuestions: [],
                },
                {
                    id: "40a3d9d6-fe4a-4290-a591-e4887defd9bb",
                    text: "Äger du någon fastighet?",
                    reasonLabel: "",
                    category: "HOME_VALUE",
                    value: null,
                    order: 3,
                    type: 3,
                    configuration:
                        '{\n  "InputType": "Number",\n  "IsRequired": false,\n  "Max": 100000000,\n  "Min": 1,\n  "Version": "1.0.0",\n  "Type": 3,\n  "GroupLabel": "kr",\n  "Hint": "(Bostadsrätt, villa, skog, etc.)",\n  "FirstLabelTitle": "Ja",\n  "SecondLabelTitle": "Nej",\n  "Modal": {\n    "Title": "Fastigheter",\n    "Description": "Fyll i värdet på din bostadsrätt, villa, skog eller liknande. Fyll i det sammanlagda värdet om du har flera fastigheter. Om du äger en fastighet tillsammans med någon fyller du i din del av värdet.",\n    "Label": "Värde"\n  },\n  "ErrorMessage": "Fyll i värdet på dina fastigheter"\n}',
                    media: [],
                    rules: [
                        { ruleType: 3, value: "100000000", message: "Värdet kan inte vara över" },
                        { ruleType: 2, value: "1", message: null },
                    ],
                    confirm: null,
                    followupQuestions: [],
                },
                {
                    id: "b5f188a9-6ca8-4c08-9db8-bd5315316077",
                    text: "Äger du något företag?",
                    reasonLabel: "",
                    category: "ASSETS_VALUE",
                    value: null,
                    order: 4,
                    type: 3,
                    configuration:
                        '{\n  "InputType": "Number",\n  "IsRequired": false,\n  "Max": 100000000,\n  "Min": 1,\n  "Version": "1.0.0",\n  "Type": 3,\n  "GroupLabel": "kr",\n  "FirstLabelTitle": "Ja",\n  "SecondLabelTitle": "Nej",\n  "Modal": {\n    "Title": "Företag",\n    "Description": "Gör en försiktig uppskattning av värdet på ditt företag. Fyll i det sammanlagda värdet om du har flera företag. Om du äger ett företag tillsammans med någon fyller du i din del av värdet.",\n    "Label": "Värde"\n  },\n  "ErrorMessage": "Fyll i värdet på dina företag"\n}',
                    media: [],
                    rules: [
                        { ruleType: 3, value: "100000000", message: "Värdet kan inte vara över" },
                        { ruleType: 2, value: "1", message: null },
                    ],
                    confirm: null,
                    followupQuestions: [],
                },
                {
                    id: "0c1ccfb5-4f41-4fee-bc77-d1c8fe52fc01",
                    text: "Har du andra tillgångar?",
                    reasonLabel: "",
                    category: "ASSETS_VALUE",
                    value: "",
                    order: 5,
                    type: 3,
                    configuration:
                        '{\n  "InputType": "Number",\n  "IsRequired": false,\n  "Max": 100000000,\n  "Min": 1,\n  "Version": "1.0.0",\n  "Type": 3,\n  "GroupLabel": "kr",\n  "FirstLabelTitle": "Ja",\n  "SecondLabelTitle": "Nej",\n  "Modal": {\n    "Title": "Andra tillgångar",\n    "Description": "Om du har en tillgång tillsammans med någon fyller du i din del av värdet.",\n    "Label": "Värde"\n  },\n  "ErrorMessage": "Fyll i värdet på dina andra tillgångar"\n}',
                    media: [],
                    rules: [
                        { ruleType: 3, value: "100000000", message: "Värdet kan inte vara över" },
                        { ruleType: 2, value: "1", message: null },
                    ],
                    confirm: null,
                    followupQuestions: [],
                },
            ],
            groupQuestionItems: [],
        },
        {
            id: "a7c43f6c-9fc0-43bb-bc46-f5c9a6f3de85",
            name: "Skulder",
            text: "Lägg till skulder som du har hos eller utanför SEB.",
            description: "",
            subTitle: "Din ekonomi",
            shortDescription: "",
            optionType: 3,
            media: [],
            answerAlternatives: [
                {
                    id: "6c1865c2-b3f8-4c62-81db-8c226922f704",
                    text: "Har du bolån?",
                    reasonLabel: "",
                    category: "HOME_MORTGAGE",
                    value: null,
                    order: 1,
                    type: 3,
                    configuration:
                        '{\n  "InputType": "Number",\n  "IsRequired": false,\n  "Max": 100000000,\n  "Min": 1,\n  "Version": "1.0.0",\n  "Type": 3,\n  "GroupLabel": "kr",\n  "FirstLabelTitle": "Ja",\n  "SecondLabelTitle": "Nej",\n  "Modal": {\n    "Title": "Bolån",\n    "Description": "Räkna även med bolån som du har hos SEB. Om du har lån tillsammans med någon fyller du i din del av lånet.",\n    "Label": "Värde"\n  },\n  "ErrorMessage": "Fyll i värdet på dina bolån"\n}',
                    media: [],
                    rules: [
                        { ruleType: 2, value: "1", message: null },
                        { ruleType: 3, value: "100000000", message: "Värdet kan inte vara över" },
                    ],
                    confirm: null,
                    followupQuestions: [],
                },
                {
                    id: "56b18f29-b891-474d-b95f-4ef055541f62",
                    text: "Har du studielån?",
                    reasonLabel: null,
                    category: "DEBTS",
                    value: null,
                    order: 2,
                    type: 3,
                    configuration:
                        '{\n  "InputType": "Number",\n  "IsRequired": false,\n  "Max": 100000000,\n  "Min": 1,\n  "Version": "1.0.0",\n  "Type": 3,\n  "GroupLabel": "kr",\n  "FirstLabelTitle": "Ja",\n  "SecondLabelTitle": "Nej",\n  "Modal": {\n    "Title": "Studielån",\n    "Label": "Värde"\n  },\n  "ErrorMessage": "Fyll i värdet på dina studielån"\n}',
                    media: [],
                    rules: [
                        { ruleType: 3, value: "100000000", message: "Värdet kan inte vara över" },
                        { ruleType: 2, value: "1", message: "Du behöver fylla i ett värde större än eller lika med" },
                    ],
                    confirm: null,
                    followupQuestions: [],
                },
                {
                    id: "03f82657-2ed2-4e95-bbf6-cf3d5c8c6268",
                    text: "Har du andra lån?",
                    reasonLabel: "",
                    category: "DEBTS",
                    value: null,
                    order: 3,
                    type: 3,
                    configuration:
                        '{\n  "InputType": "Number",\n  "IsRequired": false,\n  "Max": 100000000,\n  "Min": 1,\n  "Version": "1.0.0",\n  "Type": 3,\n  "GroupLabel": "kr",\n  "Hint": "(billån, blancolån etc.)",\n  "FirstLabelTitle": "Ja",\n  "SecondLabelTitle": "Nej",\n  "Modal": {\n    "Title": "Lån",\n    "Description": "Fyll i värdet på billån och andra blancolån. Räkna även med lån som du har hos SEB. Om du har lån tillsammans med någon fyller du i din del av lånet.",\n    "Label": "Värde"\n  },\n  "ErrorMessage": "Fyll i värdet på dina lån"\n}',
                    media: [],
                    rules: [
                        { ruleType: 2, value: "1", message: null },
                        { ruleType: 3, value: "100000000", message: "Värdet kan inte vara över" },
                    ],
                    confirm: null,
                    followupQuestions: [],
                },
                {
                    id: "c1e9b886-39e9-476e-a7c6-f4b7eba39ca7",
                    text: "Har du någon kreditkortsskuld? ",
                    reasonLabel: "",
                    category: "DEBTS",
                    value: null,
                    order: 4,
                    type: 3,
                    configuration:
                        '{\n  "InputType": "Number",\n  "IsRequired": false,\n  "Max": 100000000,\n  "Min": 1,\n  "Version": "1.0.0",\n  "Type": 3,\n  "GroupLabel": "kr",\n  "FirstLabelTitle": "Ja",\n  "SecondLabelTitle": "Nej",\n  "Modal": {\n    "Title": "Kreditkortsskuld",\n    "Description": "Fyll i den sammanlagda skuld som du har på dina kreditkort just nu. Räkna även med skulder på kreditkort som du har hos SEB. Om du delar ett kort med någon fyller du bara i din del. ",\n    "Label": "Värde"\n  },\n  "ErrorMessage": "Fyll i hur mycket du har i kreditskulder"\n}',
                    media: [],
                    rules: [
                        { ruleType: 2, value: "1", message: "Du behöver fylla i ett värde större än eller lika med" },
                        { ruleType: 3, value: "100000000", message: "Värdet kan inte vara över" },
                    ],
                    confirm: null,
                    followupQuestions: [],
                },
                {
                    id: "1e228169-a2f3-42e5-8cc0-58473f5d53db",
                    text: "Har du andra skulder?",
                    reasonLabel: "",
                    category: "DEBTS",
                    value: null,
                    order: 5,
                    type: 3,
                    configuration:
                        '{\n  "InputType": "Number",\n  "IsRequired": false,\n  "Max": 100000000,\n  "Min": 1,\n  "Version": "1.0.0",\n  "Type": 3,\n  "GroupLabel": "kr",\n  "FirstLabelTitle": "Ja",\n  "SecondLabelTitle": "Nej",\n  "Modal": {\n    "Title": "Andra skulder",\n    "Description": "Här kan du fylla i alla andra typer av skulder, till exempel privata skulder eller om du har tagit över en skuld för någon som du är borgensman för",\n    "Label": "Värde"\n  },\n  "ErrorMessage": "Fyll i värdet på dina andra skulder"\n}',
                    media: [],
                    rules: [
                        { ruleType: 2, value: "1", message: "Du behöver fylla i ett värde större än eller lika med" },
                        { ruleType: 3, value: "100000000", message: "Värdet kan inte vara över" },
                    ],
                    confirm: null,
                    followupQuestions: [],
                },
            ],
            groupQuestionItems: [],
        },
    ];

    constructor(private formService: FormService) {
        const familyFollowup: FollowUpItem = {
            type: "inline",
            items: [
                {
                    key: "partner-birth-date",
                    controlType: "Datepicker",
                    value: "",
                    controlMetaData: {
                        label: "Dina partners födelsedatum:",
                    },
                    rules: [
                        {
                            message: "field is required",
                            type: RuleType.required,
                        },
                    ],
                },
                {
                    key: "partner-name",
                    controlType: "Text",
                    value: "",
                    controlMetaData: {
                        label: "Din partners för-och efternamn:",
                    },
                    rules: [
                        {
                            message: "field is required",
                            type: RuleType.required,
                        },
                    ],
                },
                {
                    key: "partner-monthly-income",
                    controlType: "Number",
                    value: "",
                    controlMetaData: {
                        label: "Din partners månadsinkomst:",
                    },
                    rules: [
                        {
                            message: "field is required",
                            type: RuleType.required,
                        },
                    ],
                },
                {
                    key: "partner-monthly-income-more-than-equal",
                    controlType: "Number",
                    value: "",
                    controlMetaData: {
                        label: "partner-monthly-income-more-than-equal",
                    },
                    rules: [
                        {
                            message: "field is required",
                            type: RuleType.required,
                        },
                        {
                            message: "more than or equal partner monthly income",
                            type: RuleType.minThanEqualsReference,
                            value: "partner-monthly-income",
                        },
                    ],
                },
                {
                    key: "partner-monthly-income-more-than",
                    controlType: "Number",
                    value: "",
                    controlMetaData: {
                        label: "partner-monthly-income-more-than",
                    },
                    rules: [
                        {
                            message: "field is required",
                            type: RuleType.required,
                        },
                        {
                            message: "more than partner monthly income",
                            type: RuleType.minThanReference,
                            value: "partner-monthly-income",
                        },
                    ],
                },
                {
                    key: "partner-monthly-income-less-than",
                    controlType: "Number",
                    value: "",
                    controlMetaData: {
                        label: "partner-monthly-income-less-than",
                    },
                    rules: [
                        {
                            message: "field is required",
                            type: RuleType.required,
                        },
                        {
                            message: "less than partner monthly income",
                            type: RuleType.maxThanReference,
                            value: "partner-monthly-income",
                        },
                    ],
                },
                {
                    key: "partner-monthly-income-less-than-equal",
                    controlType: "Number",
                    value: "",
                    controlMetaData: {
                        label: "partner-monthly-income-less-than-equal",
                    },
                    rules: [
                        {
                            message: "field is required",
                            type: RuleType.required,
                        },
                        {
                            message: "less than equal partner monthly income",
                            type: RuleType.maxThanEqualReference,
                            value: "partner-monthly-income",
                        },
                    ],
                },
                {
                    key: "partner-monthly-income-radio",
                    controlType: "Radio",
                    label: "",
                    options: [
                        {
                            id: "1",
                            value: "1",
                            label: "Före skatt",
                        },
                        {
                            id: "2",
                            value: "2",
                            label: "Efter skatt",
                        },
                    ],
                },
                {
                    key: "then-maried",
                    controlType: "Text",
                    label: "Gift sedan",
                },
            ],
        };

        const formGroup: DynamicFormSection[] = [
            {
                key: "form1",
                title: "Familj",
                items: [
                    {
                        key: "relation",
                        title: "Relation",
                        controlType: "ToggleSelector",
                        options: [
                            {
                                id: "1",
                                value: "1",
                                label: "Gift",
                                followUpItems: familyFollowup,
                            },
                            {
                                id: "2",
                                value: "2",
                                label: "Sambo",
                                followUpItems: familyFollowup,
                            },
                            {
                                id: "3",
                                value: "3",
                                label: "Sarbo",
                                followUpItems: familyFollowup,
                            },
                            {
                                id: "4",
                                value: "4",
                                label: "Singel",
                            },
                        ],
                        rules: [
                            {
                                type: RuleType.required,
                                message: "please select one item",
                                value: "",
                            },
                        ],
                    },
                    {
                        key: "extra-information",
                        controlType: "Checkbox",
                        title: "Har du och din partner något av nedstående?",
                        label: "Äktenskapsförord",
                        value: "",
                    },
                    {
                        key: "deed-of-gift",
                        controlType: "Checkbox",
                        label: "Gåvobrev",
                        value: "",
                    },
                    {
                        key: "testament",
                        controlType: "Checkbox",
                        label: "Testamente",
                        value: "",
                    },
                    {
                        key: "none-of-the-above",
                        controlType: "Checkbox",
                        label: "Inget av ovanstående",
                        value: "",
                    },
                    {
                        key: "barn",
                        controlType: "Radio",
                        title: "Barn",
                        description: "Har du eller din partner barn?",
                        value: "",
                        options: [
                            {
                                id: "1",
                                value: "1",
                                label: "Ja",
                                followUpItems: {
                                    type: "modal",
                                    items: [
                                        {
                                            key: "child-name",
                                            controlType: "Text",
                                            value: "",
                                            controlMetaData: {
                                                label: "Barnets namn",
                                            },
                                            rules: [
                                                {
                                                    message: "field is required",
                                                    type: RuleType.required,
                                                },
                                            ],
                                        },
                                        {
                                            key: "child-to",
                                            controlType: "Text",
                                            value: "",
                                            controlMetaData: {
                                                label: "Barn till",
                                            },
                                            rules: [
                                                {
                                                    message: "field is required",
                                                    type: RuleType.required,
                                                },
                                            ],
                                        },
                                        {
                                            key: "accomodation",
                                            controlType: "Text",
                                            value: "",
                                            controlMetaData: {
                                                label: "Boende",
                                            },
                                            rules: [
                                                {
                                                    message: "field is required",
                                                    type: RuleType.required,
                                                },
                                            ],
                                        },
                                        {
                                            key: "child-birthday",
                                            controlType: "Datepicker",
                                            value: "",
                                            controlMetaData: {
                                                label: "Barnets födelsedag:",
                                            },
                                            rules: [
                                                {
                                                    message: "field is required",
                                                    type: RuleType.required,
                                                },
                                            ],
                                        },
                                        {
                                            key: "is-child-with-partner",
                                            controlType: "Radio",
                                            value: "",
                                            controlMetaData: {
                                                label: "Är barnet gemensamt med din partner",
                                            },
                                            rules: [
                                                {
                                                    message: "field is required",
                                                    type: RuleType.required,
                                                },
                                            ],
                                            options: [
                                                {
                                                    id: "1",
                                                    value: "1",
                                                    label: "Ja",
                                                },
                                                {
                                                    id: "2",
                                                    value: "2",
                                                    label: "Nej",
                                                },
                                            ],
                                        },
                                        {
                                            key: "whos-child",
                                            controlType: "Radio",
                                            value: "",
                                            rules: [
                                                {
                                                    message: "field is required",
                                                    type: RuleType.required,
                                                },
                                            ],
                                            options: [
                                                {
                                                    id: "1",
                                                    value: "1",
                                                    label: "Barnet är mitt barn",
                                                },
                                                {
                                                    id: "2",
                                                    value: "2",
                                                    label: "Barnet är min partners barn",
                                                },
                                            ],
                                        },
                                    ],
                                    multi: true,
                                },
                            },
                            {
                                id: "2",
                                value: "2",
                                label: "Nej",
                            },
                        ],
                        rules: [
                            {
                                type: RuleType.required,
                                message: "value is required",
                                value: "",
                            },
                        ],
                    },
                ],
                multi: true
            }
        ];

        if (this.customDemo) {
            this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup(this.mapToDynamicForm(this.cplFromGroup[0]));
        } else {
            this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup(formGroup);
        }
    }

    validateForm(): void {
        this.extendedFormGroup.updateValueAndValidity();
    }

    mapToDynamicForm(obj): DynamicFormSection[] {
        let items: DynamicFormItem[] = [];

        switch (obj.optionType) {
            case QuestionOptionType.Card:
                const options: DynamicFormOption[] = obj.answerAlternatives.map(alternative => {
                    return {
                        id: alternative.id,
                        label: alternative.text,
                        category: alternative.category,
                        value: alternative.id,
                        order: alternative.order,
                    };
                });
                items = [
                    {
                        key: obj.id,
                        descriptionHeader: obj.text,
                        description: obj.description,
                        controlType: DynamicFormType.Card,
                        media: obj.media,
                        options,
                    },
                ];
                break;
            case QuestionOptionType.Input:
                items = obj.answerAlternatives.map(alternative => {
                    return {
                        key: alternative.id,
                        descriptionHeader: alternative.text,
                        description: alternative.description,
                        controlType: this.mapControlType(alternative.type),
                        media: alternative.media,
                        rules: this.mapRules(alternative.rules),
                        controlMetaData: {
                            label: alternative.reasonLabel,
                            inputGroupLabel: "kr/mån",
                            inputGroupPosition: "right",
                        },
                    };
                });
                break;
            case QuestionOptionType.Radio:
                items = obj.answerAlternatives.map(alternative => {
                    return {
                        key: alternative.id,
                        descriptionHeader: alternative.text,
                        description: alternative.description,
                        controlType: this.mapControlType(alternative.type),
                        media: alternative.media,
                        rules: this.mapRules(alternative.rules),
                        controlMetaData: {
                            label: alternative.reasonLabel,
                            inputGroupLabel: "kr/mån",
                            inputGroupPosition: "right",
                        },
                        options: [
                            {
                                id: "1",
                                value: "1",
                                label: "Ja",
                                followUpItems: {
                                    type: "modal",
                                    items: this.mapToDynamicItem(alternative.followupQuestions[0]?.answerAlternatives),
                                },
                            },
                            {
                                id: "2",
                                value: "2",
                                label: "Nej",
                            },
                        ],
                    };
                });
                break;
            case QuestionOptionType.None:
                items = [
                    {
                        key: obj.id,
                        descriptionHeader: obj.text,
                        description: obj.description,
                        controlType: DynamicFormType.Disclaimer,
                        media: obj.media,
                    },
                ];
                break;
            default:
                items = obj.answerAlternatives.map(alternative => {
                    return {
                        key: alternative.id,
                        descriptionHeader: alternative.text,
                        description: alternative.description,
                        controlType: DynamicFormType.Text,
                        media: alternative.media,
                        rules: this.mapRules(alternative.rules),
                        label: alternative.reasonLabel,
                    };
                });
                break;
        }
        return [
            {
                key: obj.id,
                category: obj.subTitle,
                title: obj.name,
                description: obj.description,
                sectionType: obj.optionType,
                text: obj.text,
                items: items,
            },
        ];
    }

    mapToDynamicItem(obj): DynamicFormItem[] {
        return obj?.map(o => {
            return {
                key: o.id,
                descriptionHeader: o.text,
                description: o.description,
                controlType: this.mapControlType(o.type),
                media: o.media,
                rules: this.mapRules(o.rules),
                controlMetaData: {
                    label: o.reasonLabel,
                    inputGroupLabel: "kr/mån",
                    inputGroupPosition: "right",
                },
            };
        });
    }

    mapRules(rules): Rule[] {
        return rules.map(rule => {
            switch (rule.ruleType) {
                case 0:
                default:
                    return { value: rule.value, message: rule.message, type: RuleType.required };
                case 1:
                    return { value: rule.value, message: rule.message, type: RuleType.pattern };
                case 2:
                    return { value: rule.value, message: rule.message, type: RuleType.min };
                case 3:
                    return { value: rule.value, message: rule.message, type: RuleType.max };
                case 4:
                    return { value: rule.value, message: rule.message, type: RuleType.minLength };
                case 5:
                    return { value: rule.value, message: rule.message, type: RuleType.maxLength };
                case 6:
                    return { value: rule.value, message: rule.message, type: RuleType.minThanReference };
                case 7:
                    return { value: rule.value, message: rule.message, type: RuleType.minThanEqualsReference };
                case 8:
                    return { value: rule.value, message: rule.message, type: RuleType.maxThanReference };
                case 9:
                    return { value: rule.value, message: rule.message, type: RuleType.maxThanEqualReference };
                case 10:
                    return { value: rule.value, message: rule.message, type: RuleType.confirm };
            }
        });
    }

    mapControlType(controlType: ComponentType): DynamicFormType {
        switch (controlType) {
            case ComponentType.Text:
                return DynamicFormType.Text;
            case ComponentType.Number:
                return DynamicFormType.Number;
            case ComponentType.CheckBox:
                return DynamicFormType.Checkbox;
            case ComponentType.Date:
                return DynamicFormType.Datepicker;
            case ComponentType.RadioTextBox:
                return DynamicFormType.Radio;
            case ComponentType.Card:
                return DynamicFormType.Card;
            case ComponentType.None:
                return DynamicFormType.None;
            default:
                return DynamicFormType.Text;
        }
    }

    goToPreviousStep(): void {
        this.activeStep -= 1;
    }

    goToNextStep(): void {
        this.activeStep += 1;
        if (this.activeStep === 1 && !this.customDemo) {
            const nextFormGroup: DynamicFormSection[] = [
                {
                    key: "form2",
                    title: "Sysselsättning",
                    items: [
                        {
                            key: "occupation",
                            title: "Välj din huvudsaklig sysselsättning",
                            controlType: "ToggleSelector",
                            options: [
                                {
                                    id: "1",
                                    value: "1",
                                    label: "Anställd",
                                },
                                {
                                    id: "2",
                                    value: "2",
                                    label: "Företagare",
                                },
                                {
                                    id: "3",
                                    value: "3",
                                    label: "Pensionär",
                                },
                                {
                                    id: "4",
                                    value: "4",
                                    label: "Student",
                                },
                                {
                                    id: "5",
                                    value: "5",
                                    label: "Annat",
                                },
                            ],
                        },
                        {
                            key: "profession",
                            controlType: "Text",
                            label: "Ditt yrke",
                            value: "",
                            rules: [
                                {
                                    message: "field is required",
                                    type: RuleType.required,
                                },
                            ],
                        },
                        {
                            key: "kind-of-employment",
                            controlType: "Text",
                            label: "Vilken slags anställning/tjänsterpension",
                            value: "",
                            rules: [
                                {
                                    message: "field is required",
                                    type: RuleType.required,
                                },
                            ],
                        },
                        {
                            key: "worked-since",
                            controlType: "Text",
                            label: "Har arbetat sedan",
                            value: "",
                            rules: [
                                {
                                    message: "field is required",
                                    type: RuleType.required,
                                },
                            ],
                        },
                        {
                            key: "monthly-income",
                            controlType: "Text",
                            value: "",
                            controlMetaData: {
                                label: "Din månadsinkomst",
                                inputGroupLabel: "kr",
                                inputGroupPosition: "right",
                            },
                            rules: [
                                {
                                    message: "field is required",
                                    type: RuleType.required,
                                },
                            ],
                        },
                        {
                            key: "estimated-income-after-tax",
                            controlType: "Text",
                            value: "",
                            controlMetaData: {
                                label: "Beräknad inkonst efterskatt",
                                inputGroupLabel: "kr",
                                inputGroupPosition: "right",
                            },
                            rules: [
                                {
                                    message: "field is required",
                                    type: RuleType.required,
                                },
                            ],
                        },
                        {
                            key: "professional-experience",
                            title: "Yrekeserfarenhet av värdepapper eller försäkring",
                            description:
                                "Vi behöver veta om du har haft ett yrke där du lärt dig om värdepapper och finansiella marknader eftersom vi anpassar våra råd efter din kunskapsnivå och erfarenheta",
                            controlType: "Radio",
                            value: "",
                            options: [
                                {
                                    id: "1",
                                    value: "1",
                                    label: "Ja, det har jag",
                                },
                                {
                                    id: "2",
                                    value: "2",
                                    label: "Nej, det har jag inte",
                                },
                            ],
                        },
                        {
                            key: "other-comments",
                            controlType: "TextArea",
                            controlMetaData: {
                                label: "Beräknad inkonst efterskatt",
                                inputGroupLabel: "kr",
                                inputGroupPosition: "right",
                            },
                        },
                    ],
                },
            ];
            this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup(nextFormGroup, this.extendedFormGroup);
        }

        if (this.customDemo) {
            this.extendedFormGroup = this.formService.dynamicFormSectionsToFormGroup(
                this.mapToDynamicForm(this.cplFromGroup[this.activeStep]),
                this.extendedFormGroup
            );
        }
    }
}
