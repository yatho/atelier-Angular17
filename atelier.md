author: Yann-Thomas Le Moigne
summary: Atelier Angular 17
id: atelier-angular-17
categories: angular, atelier, bonnes pratiques
environments: Web
status: Published
feedback link: https://github.com/yatho/atelier-Angular17.git

# Atelier angular 17

## Introduction
Duration: 0:05:00

Cet atelier permet de monter en compétence sur les dernières versions d'Angular en migrant une petite application.

1. Fork du [repo](https://github.com/yatho/atelier-Angular17).
2. Clonez sur votre poste.
3. Lancer : ```npm install```
4. Lancer : ```npm start```

Bonne pratique : Faites des commits réguliers pour facilement revenir en arrière en cas de besoin

## Partie 1 : Input binding (Théorie)

### Required

Depuis **Angular 16**, il est possible de dire au compilateur que l'input est obligatoire.

```typescript
@Input({required: true}) name: string;
```

### bindToComponentInputs / withComponentInputBinding

Il n'est plus nécessaire d'importer le service **Route** pour lire au sein de l'url. En configurant l'option suivante :

Pour des modules :
```typescript
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true
  })],
  exports: [RouterModule]
})
```

Pour du standalone :
```typescript
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, 
        ...
        withComponentInputBinding()
    )
  ],
});
```

Depuis une url tel que celle-ci :
```
http://localhost:4200/your-path/42?query=Angular
```

On peut récupérer directement les informations sous formes d'input au sein des composants:

```typescript
import { ActivatedRoute } from '@angular/router';

@Component({ … })
class YourComponent {
  @Input() id?: number;
  @Input() crisis?: Crisis;
  @Input() otherSample?: string;
  @Input() query?: string;
}
```

## Partie 1 : Input binding (TP)
Duration: 0:15:00

1. Supprimer le fichier `utility.ts` et utiliser des @Input() avec l'option de routing `bindToComponentInputs`

## Partie 2 : Standalone (Théorie)

### Introduction

Un composant **standalone** est un composant autogéré. Il n'appartient pas à un **module** car il devient, lors de la compilation, lui même un **module**.

La notion de **standalone** est en réalité qu'un flag dans le decorator @Component, @Directive :

```ts
@Component({
  standalone: true,
  selector: 'photo-gallery',
  // an existing module is imported directly into a standalone component
  imports: [MatButtonModule],
  template: `
    ...
    <button mat-button>Next Page</button>
  `,
})
export class PhotoGalleryComponent {
  // logic
}
```

Ce flag va permettre de dire au compilateur Angular de créer un module lors de la compilation.

### Utilisation

Étant donné qu'il est lui même un module, il va pouvoir être importé directement dans un module au même titre que les autres.

Exemple : 

```ts
@NgModule({
  declarations: [AlbumComponent],
  exports: [AlbumComponent], 
  imports: [PhotoGalleryComponent],
})
export class AlbumModule {}
```

### Routing avec des standalone component

L'avantage des **standalone component** est la facilité de mettre en place du lazy loading. 

On va écrire la même syntax, à peu de chose près que pour un module. La seule chose qui va changer c'est la méthode appelée : 

```ts
export const ROUTES: Route[] = [
  {path: 'admin', loadComponent: () => import('./admin/panel.component').then(mod => mod.AdminPanelComponent)},
  // ...
];
```

Il est possible de séparer le fichier de configuration des routes :

```ts
// In the main application:
export const ROUTES: Route[] = [
  {path: 'admin', loadChildren: () => import('./admin/routes').then(mod => mod.ADMIN_ROUTES)},
  // ...
];

// In admin/routes.ts:
export const ADMIN_ROUTES: Route[] = [
  {path: 'home', component: AdminHomeComponent},
  {path: 'users', component: AdminUsersComponent},
  // ...
];
```

Depuis Angular 16, il est possible également d'utiliser la notion de default, ce qui simplifie la syntaxe :

```ts
// In the main application:
export const ROUTES: Route[] = [
  {path: 'admin', loadChildren: () => import('./admin/routes')},
  // ...
];

// In admin/routes.ts:
export default [
  {path: 'home', component: AdminHomeComponent},
  {path: 'users', component: AdminUsersComponent},
  // ...
] as Route[];
```

### Bootstrap avec un standalone component

Pour supprimer l'ensemble des modules, il va falloir modifier le bootstraping de l'application en modifiant la méthode du fichier **main.js**. 
Les services nécessaires à l'ensemble de l'application seront fournis dans ce fichier.

```ts
bootstrapApplication(PhotoAppComponent, {
  providers: [
    provideRouter([/* app routes */], {/* options comme withComponentInputBinding() par exemple*/}),
    provideHttpClient()
    // ...
  ]
});
```

Par exemple, ```provideRouter``` remplacera la configuration ```RouterModule.forRoot```. Il en va de même avec plusieurs fonctions utilitaires.

## Partie 2 : Standalone (TP)
Duration: 0:30:00

1. Migrez le composant `header` à la main.
2. Utiliser la schematics `ng g @angular/core:standalone` pour migrer en automatique un maximum de choses.
3. Réussite : Le comportement de l'application est inchangé.
4. Allez plus loin avec la suppression des modules de routing.

## Partie 3 : Control flow (Théorie)

### Introduction

Depuis la version 17 d'Angular, une nouvelle manière d'écrire les conditions et les boucles dans le template des composants a été introduite.

Il est important de noter que les méthodes précédentes continuent de fonctionner.

#### Exemple

Voici un exemple dans un composant du nouveau système de control flow :

```typescript
// user-controls.component.ts
@Component({
  standalone: true,
  selector: 'user-controls',
  template: `
    @if (isAdmin) {
      <button>Erase database</button>
    }
  `,
})
export class UserControls {
  isAdmin = true;
}
```

Note : Pour la suite de ce document, seule la partie template sera présentée, sans le composant lui-même, afin de simplifier l'explication.

### Condition

#### @If

Le template
```html
<ng-container *ngIf="a > b">
   {{a}} is greater than {{b}}
</ng-container>
```

devient : 
```html
@if (a > b) {
   {{a}} is greater than {{b}}
}
```

#### @Else

Le template
```html
<ng-container *ngIf="a > b; else cond1">
  {{a}} is greater than {{b}}
</ng-container>
<ng-template #cond1>
  <ng-container *ngIf="b > a; else equal">
  {{a}} is less than {{b}}
  </ng-container>
  <ng-template #equal>
  {{a}} is equal to {{b}}
  </ng-template>
</ng-template>
```

devient : 
```html
@if (a > b) {
  {{a}} is greater than {{b}}
} @else if (b > a) {
  {{a}} is less than {{b}}
} @else {
  {{a}} is equal to {{b}}
}
```

#### Variable @If

Il est toujours possible de créer une variable HTML avec la syntaxe : 
```html
@if (users$ | async; as users) {
  {{ users.length }}
}
```

#### @Switch

Le template : 
```html
<ng-container [ngSwitch]="condition">
  <ng-container *ngSwitchCase="'caseA'">Case A.</ng-container>
  <ng-container *ngSwitchCase="'caseB'">Case B.</ng-container>
  <ng-container *ngSwitchDefault>Default case.</ng-container>
</ng-container>
```

devient : 
```html
@switch (condition) {
  @case (caseA) {
    Case A.
  }
  @case (caseB) {
    Case B.
  }
  @default {
    Default case.
  }
}
```

### Boucle

#### @For

Le template 
```html
<ng-container *ngFor="let item of items">{{ item.name }}</ng-container>
```

devient : 
```html
@for (item of items; track item.id) {
  {{ item.name }}
}
```

Il est toujours possible d'utiliser les variables contextuelles de la directive @for.

```html
@for (item of items; track item.id; let idx = $index, e = $even) {
  Item #{{ idx }}: {{ item.name }}
}
```

Voici les variables contextuelles disponibles :

| Variable contextuel | Signification                         |
|---------------------|---------------------------------------|
| $count              | Nombre d'éléments dans la collection  |
| $index              | Index de la ligne                     |
| $first              | True si c'est la première ligne       |
| $last               | True si c'est la dernière ligne       |
| $even               | True si la ligne est paire            |
| $odd                | True si la ligne est impaire          |

##### Track

Lorsqu'Angular affiche une liste d'éléments avec @for, ces éléments peuvent être modifiés ou déplacés ultérieurement. Angular doit suivre chaque élément lors de toute réorganisation, généralement en traitant une propriété de l'élément comme un identifiant ou une clé unique.

Cela garantit que toutes les mises à jour de la liste sont correctement reflétées dans l'interface utilisateur et correctement suivies dans Angular, en particulier dans le cas d'éléments ou d'animations avec état.

Pour ce faire, nous pouvons fournir une clé unique à Angular avec le mot-clé track.

Il est également possible de fournir une fonction comme préalablement avec le mot clé trackBy dans la directive ngFor :

```html
@for (item of items; track itemId($index, item)) {
  {{ item.name }}
}
```

#### @Empty

Le template : 
```html
<ng-container *ngIf="item.length; else empty">
  <li *ngFor="let item of items"> {{ item.name }} </li>
</ng-container>
<ng-template #empty>
  <li> There are no items. </li>
</ng-template>
```

devient : 
```html
@for (item of items; track item.name) {
  <li> {{ item.name }} </li>
} @empty {
  <li> There are no items. </li>
}
```

## Partie 3 : Control flow (TP)
Duration: 0:20:00

1. Migrez le composant `recipe` vers le modèle full control-flow.
2. Supprimer le type `$any` et voir que maintenant le typage fonctionne !
3. Utiliser la schematics `ng g @angular/core:control-flow` pour migrer en automatique un maximum de choses.
4. Réussite : Le comportement de l'application est inchangé.

## Partie 4 : Formulaire typé (Théorie)

### Typage

Depuis **Angular 14** il est possible et recommandé de typer ses formulaires. Cette pratique permet d'utiliser au mieux les possibilités du langage Typescript afin d'avoir un retour au plus tôt sur des erreurs éventuelles de type de données.

Voici un exemple de formulaire typé :

```typescript
const login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
});
```

Ici, les champs **email** et **password** sont typés en **string**. Cela est possible via l'inférence de type.

#### L'inférence de type c'est quoi ?

L'ínférence de type c'est lorsqu'on ne type pas explicitement le formulaire. On laisse le compilateur faire le travail pour nous.

Dans l'exemple précédent, le compilateur lit la valeur initiale. C'est un **string** alors le compilateur positionne le champ en tant que **string**.

#### Avantage du typage

Le typage permet d'avoir des erreurs de compilation lorsque vous utilisez cette notation par exemple :

```typescript
const emailDomain = login.value.email.domain; -> Erreur
```

#### Null ou undefined ??

En réalité, c'est un peu plus complexe que cela. Le type n'est pas simplement **string** mais **string | undefined | null**.

##### Pourquoi **null** ?

Sur un **AbstractForm**, on peut utiliser la méthode **reset** qui va positionner la valeur **null** par défaut. Il est donc possible d'avoir la valeur **null** pour l'ensemble des champs du formulaire.

On peut changer ce comportement par défaut en ajoutant une option sur le champs de la façon suivante :

```typescript
const email = new FormControl('angularrox@gmail.com', {nonNullable: true});
email.reset();
console.log(email.value); // angularrox@gmail.com
```

Dans ce cas présent, la valeur positionnée par la méthode **reset** sera la valeur initiale.

##### Pourquoi **undefined** ?

Un **AbstractControl** peut être désactivé. Lorsqu'un champ est disable, alors la valeur retournée par le getter **value** est **undefined**.

Il est possible d'éviter cette problèmatique en utilisant la méthode **getRawValue** à la place du getter **value**. Cette méthode permet de lire les valeurs des champs disable. 

Attention: L'usage de **getRawValue** peut ne pas pas avoir le comportement attendu !

#### Typage explicite

##### Typage du FormControl

Parfois l'inférence de type n'est pas possible. Dans ce cas, on va pouvoir utiliser le typage explicite.

Pour typer explicitement, on va positionner entre chevron les types que le champ aura le droit de prendre de la façon suivante :

```typescript
const email = new FormControl<string|null>(null);
email.setValue('angularrox@gmail.com');
```

Attention: Le champ **email** peut être disable. Donc il peut avoir la valeur **undefined** même si vous ne l'avez pas noté explicitement.

##### Typage du FormGroup

Il est également possible de typer le **FormGroup** complet sans avoir à décrire champ par champ.

Pour faire cela, on va créer un nouveau type qu'on va attribuer, entre chevrons, au **FormGroup**.

```typescript
const FormGroupType = {
  count: FormControl<number | null>;
}

formGroup = new FormGroup<FormGroupType>({
  count: new FormControl(null)
});
```

Le code ci-dessus sera équivalent à celui-ci :

```typescript
formGroup = new FormGroup({
  count: new FormControl<number | null>(null)
});
```

Attention: Le champs **count** peut être disable. Donc il peut avoir la valeur **undefined** même si vous ne l'avez pas noté explicitement.

##### Erreur possible - Types of property 'xxx' are incompatible

```typescripts
formGroup.count = {value: null} ou {value: 12}

type FormValue = {
  count: null | number;
}

function test(val: FormValue) {...}

test(formGroup.count) => error
```

**Ne pas oublier le cas du champ disabled**
```
Types of property 'count' are incompatible.
    Type 'number | null | undefined' is not assignable to type 'number | null'.
      Type 'undefined' is not assignable to type 'number | null'.
```

## Partie 4 : Formulaire typé (TP)
Duration: 0:30:00

1. Migrer le formulaire pour un formulaire typé
2. Simplifier le HTML si c'est possible (en autre pour les FormArrays)

Note : Il existe du code en haut du composant fournit afin de gagner du temps.

## Partie 5 : Signals (Théorie)

### Introduction

**Signal** est une nouveauté Angular 16. Cela correspond à un observable qui va informer les consommateurs qui l'écoute lorsqu'il change de valeur. Il peut contenir n'importe quelle valeur. Un **signal** peut être **writable** ou **read-only**.

Exemple : 

```ts
const count: WritableSignal<number> = signal(0);

// Signals are getter functions - calling them reads their value.
console.log('The count is: ' + count());
```

On peut changer la valeur du signal via la méthode **set** :

```ts
count.set(3);
```

Ou par la méthode **update** qui permet de mettre à jour la valeur en fonction de la valeur précédente :

```ts
// Increment the count by 1.
count.update(value => value + 1);
```

Note : un **signal read-only** à uniquement le type **Signal<T>**

### Computed signals

On s'abonne aux modifications d'un **WritableSignal** via la méthode **computed** :

```ts
const count: WritableSignal<number> = signal(0);
const doubleCount: Signal<number> = computed(() => count() * 2);
```

**doubleCount** sera mis à jour à chaque mise à jour de **count**.

Note: le résultat de la méthode **computed** est **read only**. On ne peut donc pas utiliser la méthode **set**, **update** ou **mutate** sur ce résultat.

La méthode **computed** peut s'executer suite à l'écoute de plusieurs **signals** :

```ts
const showCount = signal(false);
const count = signal(0);
const conditionalCount = computed(() => {
  if (showCount()) {
    return `The count is ${count()}.`;
  } else {
    return 'Nothing to see here!';
  }
});
```

Dans cet exemple, **conditionalCount** dépend de **count** et de **showCount**.

### Effects

Une fonction **effect** est une fonction qui va s'executer lorsqu'un **signal** est mis à jour :

```ts
effect(() => {
  console.log(`The current count is: ${count()}`);
});
```

Note : La méthode **effect** est toujours lancée au moins une fois.

Attention, cette méthode peut engendrer des erreurs comme celle-ci : **ExpressionChangedAfterItHasBeenChecked**.

## Partie 5 : Signals (TP)
Duration: 0:20:00

1. Simplifier l'écriture du service `shopping.service.ts` et de tout les composants associés en utilisant les signals.

## Partie 6 : Balise image (Théorie)

### Introduction

Depuis Angular 15, Angular a ajouté une nouvelle directive de gestion de chargement d'image `NgOptimizedImage`.
Cette balise à pour objectif :

- Utilisation des URLs CDN d'images pour appliquer des optimisations de chargement
- Empêcher le changement de disposition en exigeant une largeur et une hauteur
- Avertissement si la largeur ou la hauteur ont été mal réglées (erreur ratio)
- Avertissement si l'image sera visuellement déformée lors du rendu (erreur ratio)

### Utilisation

#### Import
`NgOptimizedImage` est une directive standalone et donc doit être importée pour pouvoir être utilisée.

```typescript
import { NgOptimizedImage } from '@angular/common'
...
imports: [
  NgOptimizedImage,
  // ...
],
```

#### Utilisation de la directive

Il suffit de remplacer l'attribut `src` par `ngSrc`.

```html
<img ngSrc="cat.jpg">
```

Note : Si vous utilisez un chargeur tiers intégré, assurez-vous d'omettre le chemin de l'URL de base de `src`, car il sera automatiquement ajouté au début par le chargeur.

#### Width & Height

Lors de l'usage de l'attribut `ngSrc`, il est obligatoire d'attribuer à l'image une taille fixe (width et height). Cela permet de conserver l'espace nécessaire à l'affichage de l'image, de sorte qu'après son chargement, aucune modification de la mise en page ne soit visibile à l'écran.

```html
<img ngSrc="cat.jpg" width="400" height="200">
```

Note : Dans les cas où vous souhaitez qu'une image remplisse un élément conteneur, vous pouvez utiliser l'attribut `fill`. Ceci est souvent utile lorsque vous désirez obtenir un comportement "image d'arrière-plan". Cela peut également être utile lorsque vous ne connaissez pas la largeur et la hauteur exactes de votre image, mais que vous disposez d'un conteneur parent avec une taille connue dans lequel vous souhaitez insérer votre image (voir « ajustement d'objet » ci-dessous).

```html
<img ngSrc="cat.jpg" fill>
```

Si le ratio de l'image est différent de sa taille configuré, alors un message d'avertissement sera notifié dans la console. Pour résoudre ce problème, vous pouvez utiliser les valeurs `auto` pour les attributs height et width.

## Partie 6 : Balise image (TP)
Duration: 0:05:00

1. Changer la façon d'importer les images pour utiliser la nouvelle directive.

## Partie 7 : Defer (Théorie)

### @defer

Les blocks defer sont un peu particulier. Les templates et les dépendances de ces templates ne seront chargés uniquement que lorsque les conditions de chargement sont respectées.

Les blocks @defer prennent en charge une série de déclencheurs, de prélecture et plusieurs sous-blocs utilisés pour la gestion des espaces réservés, du chargement et de l'état d'erreur.

```html
@defer {
  <large-component />
}
```

Les vues différées, également appelées blocs @defer, sont des outils puissant qui peuvent être utilisés pour réduire la taille initiale du bundle de votre application ou différer le chargement des composants lourds qui ne seront peut-être jamais chargés ou chargés à une date ultérieure. L'objectif est d'entraîner un chargement initial plus rapide.

Note : Attention, lorsqu'un block @defer se charge, celui-ci peut entrainer un changement succeptible de modifier la disposition de la page pour l'utilisateur.

Pour que les dépendances au sein d'un bloc @defer soient différées, elles doivent remplir deux conditions :

- Elles doivent être autonomes. Les dépendances non autonomes ne peuvent pas être différées et seront toujours chargées avec impatience, même à l'intérieur des blocs @defer.
- Elles ne doivent pas être directement référencés depuis le même fichier, en dehors des blocs @defer ; cela inclut les requêtes ViewChild.

Les blocs @defer ont plusieurs sous-blocs pour vous permettre de gérer différentes étapes du processus de chargement différé.

### @placeholder

@placeholder
Par défaut, le bloc @defer ne rend aucun contenu avant d'être déclenché. Le @placeholder est un bloc facultatif qui déclare le contenu à afficher pour ce cas d'usage. Ce contenu d'espace réservé est remplacé par le contenu principal une fois le chargement terminé.

Note : Pour une expérience utilisateur optimale, vous devez toujours spécifier un bloc @placeholder.

Le bloc @placeholder accepte un paramètre facultatif pour spécifier la durée minimale pendant laquelle cet espace réservé doit être affiché. Ce paramètre minimum est spécifié en incréments de temps de millisecondes (ms) ou de secondes (s). Ce paramètre existe pour empêcher le scintillement rapide du contenu de l'espace réservé dans le cas où les dépendances différées sont récupérées rapidement. Le minuteur minimum pour le bloc @placeholder commence une fois le rendu initial de ce bloc @placeholder terminé.

Note : Les dépendances du contenu du bloc @placeholder sont chargées immédiatement au chargement.

```html
@defer {
  <large-component />
} @placeholder (minimum 500ms) {
  <p>Placeholder content</p>
}
```

Note : Certains déclencheurs peuvent nécessiter la présence d'un @placeholder ou d'une variable de référence de modèle pour fonctionner. Voir la section Déclencheurs pour plus de détails.

### @loading

Le bloc @loading est un bloc facultatif qui permet de déclarer le contenu qui sera affiché lors du chargement d'éventuelles dépendances différées. Par exemple, vous pouvez afficher une icône de chargement. Semblable à @placeholder, les dépendances du bloc @loading sont chargées immédiatement au chargement.

Le bloc @loading accepte deux paramètres facultatifs pour spécifier la durée minimale d'affichage de cet espace réservé et la durée d'attente après le début du chargement avant d'afficher le modèle de chargement. Les paramètres minimum et after sont spécifiés par incréments de temps de millisecondes (ms) ou de secondes (s). Tout comme @placeholder, ces paramètres existent pour empêcher le scintillement rapide du contenu dans le cas où les dépendances différées sont récupérées rapidement. Les minuteries minimale et ultérieure du bloc @loading commencent immédiatement après le déclenchement du chargement.

```html
@defer {
  <large-component />
} @loading (after 100ms; minimum 1s) {
  <img alt="loading..." src="loading.gif" />
}
```

### @error

Le bloc @error vous permet de déclarer le contenu qui sera affiché en cas d'échec du chargement différé. Semblable à @placeholder et @loading, les dépendances du bloc @error sont chargées immédiatement au chargement. Le bloc @error est facultatif.

```html
@defer {
  <calendar-cmp />
} @error {
  <p>Failed to load the calendar</p>
}
```

### Triggers

Lorsqu'un block @defer est déclenché, il remplace le placeholder avec le contenu lazy loaded. Il existe deux options pour configurer ce déclenchement : on et when.

#### on

**on** spécifie une condition de déclenchement utilisant un déclencheur de la liste des déclencheurs disponibles ci-dessous. Un exemple serait sur l'interaction ou sur la fenêtre d'affichage.

Plusieurs déclencheurs d'événements peuvent être définis simultanément. Par exemple : sur l'interaction ; on timer(5s) signifie que le bloc @defer sera déclenché si l'utilisateur interagit avec l'espace réservé, ou après 5 secondes.

Remarque : Plusieurs déclencheurs activés sont toujours des conditions OU. De même, les conditions mélangées avec quand sont également des conditions OU.

```html
@defer (on viewport; on timer(5s)) {
  <calendar-cmp />
} @placeholder {
  <img src="placeholder.png" />
}
```

- viewport
la fenêtre d'affichage (viewport) déclencherait le bloc @defer lorsque le contenu spécifié entre dans la fenêtre d'affichage à l'aide de l'API IntersectionObserver. Il peut s'agir du contenu d'un espace réservé ou d'une référence d'élément.

Par défaut, l'espace réservé agira comme l'élément surveillé pour entrer dans la fenêtre d'affichage tant qu'il s'agit d'un nœud d'élément racine unique.

```html
@defer (on viewport) {
  <calendar-cmp />
} @placeholder {
  <div>Calendar placeholder</div>
}
```

Vous pouvez également spécifier une variable de référence de modèle dans le même modèle que le bloc @defer en tant qu'élément surveillé pour entrer dans la fenêtre. Cette variable est transmise en tant que paramètre sur le déclencheur de la fenêtre d'affichage.

```html
<div #greeting>Hello!</div>
@defer (on viewport(greeting)) {
  <greetings-cmp />
}
```

- timer
timer(x) se déclenchera après une durée spécifiée. La durée est obligatoire et peut être spécifiée en ms ou s.

```html
@defer (on timer(500ms)) {
  <calendar-cmp />
}
```

- idle : Idle déclenchera le chargement différé une fois que le navigateur aura atteint un état d'inactivité (détecté à l'aide de l'API requestIdleCallback). C'est le comportement par défaut avec un bloc @defer.

- interaction
l'interaction déclenchera le bloc @defer lorsque l'utilisateur interagit avec l'élément spécifié via des événements de clic ou de frappe.

```html
@defer (on interaction) {
  <calendar-cmp />
} @placeholder {
  <div>Calendar placeholder</div>
}
```

Vous pouvez également spécifier une variable de référence de modèle comme élément déclenchant l'interaction. Cette variable est transmise en tant que paramètre sur le déclencheur d'interaction.

```html
<button type="button" #greeting>Hello!</button>
@defer (on interaction(greeting)) {
  <calendar-cmp />
} @placeholder {
  <div>Calendar placeholder</div>
}
```

- hover
le survol déclenche un lazy loading lorsque la souris survole la zone de déclenchement.

Par défaut, l'espace réservé servira d'élément de survol tant qu'il s'agit d'un nœud d'élément racine unique.

```html
@defer (on hover) {
  <calendar-cmp />
} @placeholder {
  <div>Calendar placeholder</div>
}
```

Vous pouvez également spécifier une variable de référence de modèle comme élément de survol. Cette variable est transmise en tant que paramètre sur le déclencheur de survol.

```html
<div #greeting>Hello!</div>
@defer (on hover(greeting)) {
  <calendar-cmp />
} @placeholder {
  <div>Calendar placeholder</div>
}
```

- immediate
**immediate** déclenche immédiatement le chargement différé, ce qui signifie qu'une fois que le client a terminé le rendu, le bloc @defer commencerait alors à être récupéré immédiatement.

```html
@defer (on immediate) {
  <calendar-cmp />
} @placeholder {
  <div>Calendar placeholder</div>
}
```

## Partie 7 : Defer (TP)
Duration: 0:10:00

1. Modifier la partie suivante du `recipe-list` de façon à prefetch uniquement au survol du bouton et de charger uniquement lors du clic.

```html
<button *ngIf="!displayIdeas" (click)="displayIdeas = true"><mat-icon fontIcon="people" /></button>
<app-ideas *ngIf="!!displayIdeas" />
```

<!-- ## Partie 6 : Animations (Théorie)
## Partie 6 : Animations (TP)
Duration: 0:10:00 -->
