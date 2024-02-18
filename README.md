# Simplest

Powerful inline styling with Web components

> [!CAUTION]
> Simplest is not yet ready for production use. If you want to try this out, you can download it and play with it by editing `index.html` using the command below.

```bash
npm i
npm run serve
```

<details>
<summary>Japanese ver.</summary>

## ウェブコンポーネントによる強力なインラインスタイリング

> Simplest はまだ実用化できる段階ではありません。これを試してみたい方は、ダウンロードし、以下のコマンドを使用して`index.html`を編集することで遊ぶことができます。

```bash
npm i
npm run serve
```

## Simplest とは？

Simplest は [Lit](https://lit.dev) の属性コンバーターを利用して属性値を CSS へ変換し、それをシャドウ DOM 内の style 要素に挿入することで柔軟なインラインスタイリングを実現します。

## 用語

- **Simplest と Simple**

  私たちは`s-`というキーワードから始まるコンポーネントを提供しており、これらに付随する属性を用いてスタイリングを始めます。それらの属性値は**Simplest**といい、スペースを区切りとした**Simple**という単位で構成されています。
  例えば、

  ```html
  <s-text data-color="red; !hover::blue; @media(width>500px)::green;"
    >Hello</s-text
  >
  ```

  こちらのコードの、`"red; !hover::blue; @media(width>500px)::green;"`は Simplest に当たり、`red;`、`!hover::blue;`。`@media(width>500px)::green;`はそれぞれ Simple に当たります。

- **ブロック**

  Simple は **STYLE** と **STATE** と **QUERY** という 3 つのブロックを持つことができ、それぞれは`::`で分割されています。
  先ほどの例では、`red;`は STYLE ブロックのみで構成され、`!hover:blue`は STATE ブロックと STYLE ブロックで構成され、 `@media(width>500px)::green;`は QUERY ブロックと STYLE ブロックで構成されています。

  - **STYLE ブロック**

    このブロックはスタイルの内容を書く領域で、**Single**と**Pair**という 2 つのパターンで表現されます。Single は単一の構成でされており、例えば、`red`, `center`, `10px`などです。一方、Pair はキーとバリューという 2 つの構成要素から成り、これらは`=`で分割されています。これは、あるプロパティの部分的なスタイリングを行うときに使います。例えば、あなたが margin プロパティの top だけにスタイルを適用したい場合、あなたは`top=10px`のようなコードを書きます。

  - **STATE ブロック**

    これは`!`から始まる領域で、ある要素の状態に基づいてスタイルを適用させるときに使います。例えば、ユーザーがある要素の上にホバーしたときにテキストの色を変えたいとしましょう。その場合`!hover`のようなブロックを追加します。

  - **QUERY ブロック**

    これは`@`で始まる領域で、CSS の@ルールを記述することができます。例えば、ユーザーのデバイス幅に基づいてスタイルを変更するときは、`@media(width>500px)`のようなブロックを作ります。

## ルール

Simple にはいくつかのルールがあります。

1. **`;`で終わらせる**
   
   これは未完成の Simple を解析することを避けるためです。

2. **空白を置かない**

   Simplest はスペースをセパレーターとして各 Simple に分割され、その後、各 Simple がそれぞれ解析されます。そのため、Simple 内に空白を置くことはできません。もし空白が必要な場合は、`_`を利用してください。

4. **各ブロックは順番通りに書きます**

   Simple は QUERY ブロック、STATE ブロック、STYLE ブロックの順で書きます。なぜなら、これらは書かれた順番で CSS のネスト構造を形成するからです。

## 特殊エリアの紹介

### Simple エリア

Simple には`Simpleエリア`という特別な領域を追加することができます。これは`[`と`]`で囲むことで作成でき、インラインスタイリングを強力にします。現在は trans という疑似関数のみを利用することができます。これは transition プロパティを簡潔に記述する方法を提供しています。例えば、文字の色の変化を滑らかに遷移させたい場合があったとしましょう。この場合、以下のような Simple を記述することができます。

```html
<s-text data-color="red[trans(300ms,ease-in)]; !hover::blue;">Hello</s-text>
```

このコードにおいて、`[trans(300ms,ease-in)]`が Simple エリアに当たります。trans 疑似関数は引数に transition プロパティの値を取り、duration, timing-function, delay の順序に書く必要があります。上記のコード例では、シャドウ DOM 内の style 要素に以下の CSS が追加されます：

```css
:host {
  color: red;
  transition: color 300ms ease-in;
}
:host(:hover) {
  color: blue;
}
```

### 保護エリア

各 Simple は、それが含んでいる算術演算子の前後に空白を置く処理が行われます。ときどき、そのときに意図しない箇所までその処理が行われるケースがあり、保護エリアはこのような場合に役立ちます。このエリアは算術演算子の処理が行われる前に一時的にプレースホルダー化され、上記の処理が行われた後に復元されます。例えば、以下のように Simple 内に URL が含まれているときを考えてみましょう。

```html
<s-bg data-image="url(../../cat.png);"></s-bg>
```

これは一見すると有効な Simple に見えますが、以下のような予期しないスタイルが生成されてしまいます。

```css
:host {
  background-image: url(.. / .. / cat.png);
}
```

そのため、保護エリアを利用する必要があります。これは`{`と`}`で囲むことで作成することができます。上記の例を修正してみましょう。

```html
<s-bg data-image="url({../../cat.png});"></s-bg>
```

これにより有効なスタイルが生成されます。

```css
:host {
  background-image: url(../../cat.png);
}
```

このように、保護エリアを利用することで、フォーマットされたくない領域を作成することができました。

## チェーン

スタイルエリアがペアの状態を持つことができるプロパティであるとき、1 つの Simplest の中で複数のプロパティを扱う方法は 2 つあります。1 つ目は、それぞれを個別の Simple とするケースで、それぞれをスペース区切りで宣言します。2 つ目は、**チェーン**を利用する場合であり、これは複数のプロパティを単一の Simple に含めることができます。例えば、border-width と border-color の値を設定したい場合を考えます。

1. **個別の Simple とする**
   
   おそらく、このアプローチはとても自然に感じられることでしょう。

   ```html
   <s-box data-border="width=1px; color=red;">[SOME_CONTENT]</s-box>
   ```

   しかし、このやり方には問題があります。それは個別の Simple として宣言してしまっているので、生成される CSS は別々のブロックとなってしまうことです。

   ```css
   :host {
     border-width: 1px;
   }
   :host {
     border-color: red;
   }
   ```

   これは非効率であり、これらのプロパティを単一の Simple に収めることで同じ CSS ブロック内に宣言させることができます。そこで使用するのがチェーンです。

3. **チェーンを使う**

   チェーンは各プロパティを`|`で分割することで単一の Simple として表現することができる方法です。上記の例の場合、以下のようなコードを記述することができます。

   ```html
   <s-box data-border="width=1px|color=red;">[SOME_CONTENT]</s-box>
   ```

   これによって生成される CSS は以下のようになります。

   ```css
   :host {
     border-width: 1px;
     border-color: red;
   }
   ```

   また、チェーンは STATE ブロックにおいて複数の状態で同じスタイルを適用させたいときに便利です。例えば、ユーザーがある要素にフォーカスしたときとホバーしたときに同じスタイルを適用させたい場合を考えます。このとき、以下のようなコードを書いたとします。

   ```html
   <s-text data-color="!focus::red; !hover::red;">Hello</s-text>
   ```

   これは確かに有効な Simplest であり機能こそしますが、同じ値を個別に宣言するのは非効率です。そのため、チェーンを利用することで、以下のように修正することができます。

   ```html
   <s-text data-color="!focus|hvoer::red;">Hello</s-text>
   ```

   これによって生成される CSS は以下のようになります。

   ```css
   :host(:focus),
   :host(:hover) {
     color: red;
   }
   ```

   補足として、複数の状態全てが真である場合にのみスタイルを適用したい場合は以下のように書くことができます。

   ```html
   <s-text data-color="!focus:hover::blue;">Hello</s-text>
   ```

   これによって生成される CSS は以下のようになります。

   ```css
   :host(:focus:hover) {
     color: blue;
   }
   ```

   このように、チェーンを利用すると複数のプロパティや状態を効率的に扱うことができます。

## どのように機能しますか？

> 解析ロジック自体は時間経過とともに変化しますが、私たちはこのシンプルさを軸に改良を重ねることを示したいと思いました。

Simplest はとても単純なロジックでスタイルを生成します。ウェブコンポーネントは外部からのデータを*プロパティ*といった形で受け取ることができます。そして、私たちが提供するコンポーネントはすべて Lit をベースに作成されており、Lit はプロパティに関する様々なオプションを用意しています。

私たちはその内のカスタム属性コンバーターに着目しました。これは本来、属性とプロパティの間のデータ型を変換する際に使用されることを意図していますが、属性値をコンポーネントのインスタンス内のプロパティとして扱う前に別の形に変換するという発想が面白いと感じて、これを現在の処理方法として採用しています。

私たちが行うことは、属性値を AST へ作成し、それを CSS に解釈するということだけであり、この方法は将来的に変更されることはないと考えています。

一連の処理の流れを、具体例と共に説明します。以下のような`<s-text>`要素を作成したとしましょう。

```html
<s-text data-color="red; @media(width>500px)::!hover::blue;">Hello</s-text>
```

Simplest は以下の 3 つの主要な関数によって処理が行われます。

- simplestConverter
- generateAST
- generateCSS

1. **simplestconverter**

   この関数は、属性値が今後の処理を行うものに適切なものか検証を行い、Simplest を各 Simple へと分解します。そして、それらを generateAST 関数へ渡し、それから返されたノードを generateCSS 関数へ渡し、それから返された CSS 文字列をプロパティの値として返します。

   1. **トリミング**

      余分なスペースが削除されます。

      ```js
      const simplest = 'red; @media(width>500px)::!hover::blue);';
      ```

   2. **Simple への分解**

      Simplest はスペースをセパレーターとして、各 Simple に分割されます。

      ```js
      const simples = ['red;', '@media(width>500px)::!hover::blue);'];
      ```

   3. **Simple の処理**

      1. Simple の末尾の確認

         もし`;`で終わっていれば有効な Simple であると判断します。

         ```js
         simple = 'red';
         simple = '@media(width>500px)::!hover::blue';
         ```

      2. 複数の値を繋ぐ`_`の処理

         すべての`_`は単一のスペースへ置き換えられます。

      3. 演算子が処理されます。

         CSS 変数と保護エリアはプレースホルダー化され、Simple に含まれるすべての算術演算子の左右にスペースが置かれます。

         ```js
         simple = '@media(width > 500px)::!hover::blue';
         ```

      4. 抽象構文木の作成

         generateAST 関数によって、Simple は以下のノードへ変換されます。

         ```js
         // red
         ast = {
           block: 'root',
           value: '',
           child: {
             block: 'style',
             value: 'red',
             child: null,
           },
         };

         // @media(width > 500px)::!hover::blue
         ast = {
           block: 'root',
           value: '',
           child: {
             block: 'query',
             value: 'media(width > 500px)',
             child: {
               block: 'state',
               value: 'hover',
               child: {
                 block: 'style',
                 value: 'blue',
                 child: null,
               },
             },
           },
         };
         ```

      5. AST から CSS への変換

         AST は*prop*と呼ばれる情報と共に generateCSS 関数へ渡され、処理され、プロパティの値として渡されます。

         ```css
         :host {
           color: red;
         }
         :host(:hover) {
           color: blue;
         }
         ```

      6. スタイルの結合
         `<s-text>`要素に存在する各プロパティの値が結合され、レンダリング時にシャドウ DOM 内の`<style>`要素に挿入されます。

2. **generateAST**

   Simple を各ブロックごとに分割し、以下のノードへ変換します。

   ```ts
   class SimpleNode {
     child: SimpleNode | null = null;
     constructor(
       public block: 'root' | BlockName = 'root',
       public value: string = ''
     ) {}
     setChild(node: SimpleNode): void {
       this.child = node;
     }
   }
   ```

   もしブロックが`@`で始まっていれば、それを QUERY ブロックのノードとし、`!`で始まっていれば、それを STATE ブロックとノードとし、それ以外であれば STYLE ブロックのノードとします。

3. **generateCSS**

   AST を探索し、各ブロックを CSS の構造へと変換します。

## Simplest の問題と今後の修正案

Simplest のロジックは単純ですが、まだ実用までには至らない点がいくつかあります。しかしこれを解決するための草案は既に考えているため、興味があればご覧ください。

1. **テストについて**

   2024/02/14 時点において、Simplest は単独で開発されており、テストをほとんど作成できておりません。そのため、実用化までは長い道のりになる可能性があることを言及しておきます。

2. **複数の属性により生成される非効率な CSS**

   チェインを使用することで同じ属性では同じ CSS ブロックを生成する必要はなくなりました。しかし、1 つのコンポーネントで複数の属性が設定されるとそれらはコンバーターによって個別に処理されるため、同じ CSS ブロックを生成してしまいます。例えば、以下のような`<s-box>`要素を考えてみましょう。

   ```html
   <s-box data-padding="top=10px;" data-margin="20px;">[SOME_CONTENT]</s-box>
   ```

   これによって生成される CSS は以下のようになります。

   ```css
   :host {
     padding-top: 10px;
   }
   :host {
     margin: 20px;
   }
   ```

   私たちはこの問題を解決するために、コンバーター内で AST を CSS へ変換するのではなく、AST を返すようにし、レンダリング時に各属性のプロパティの値であるそれらを一括で CSS へと変換するロジックへ変更する予定です。
   このロジックへ移行した場合、STYLE ブロック内でチェーンを使用する必要はなくなると思われるかもしれません。しかし、この方法でも新しいノードが生成されることに変わりはないため、非効率な処理となる可能性があります。加えて、私たちはチェーンの書き方を強く勧めます。なぜなら、それぞれの Simple は独立したものであるべきだと考えているからです。例えば、以下のような例を見てみましょう。

   ```html
   <s-box
     data-padding="10px; @media(width>500px)::20px; top=15px !hover::left=10px; bottom=30px;"
     >[CONTENT]</s-box
   >
   ```

   このコードはとても混乱します。条件付きのスタイルと静的なスタイルが混在している状態は非常に醜いです。そのため、チェーンを利用することをおすすめします。チェーンを使用してリファクタリングしたコードは以下の通りです。

   ```html
   <s-box
     data-padding="10px|top=15px|bottom=30px; @media(width>500px)::20px; !hover::left=10px;"
     >[CONTENT]</s-box
   >
   ```

   このように、チェーンを利用できる状況であれば常にこの書き方に固執すべきです。

3. **子要素は親要素のイベントを聞くことができない**

   現状、すべてのスタイルはシャドウ DOM 内で生成されるため、子要素は親要素の状態によってスタイリングを適用することはできません。これが Simplest がまだ実用段階に入ることのできない大きな要因です。例えば、あなたはボタンの見た目をしたリンクを作成したいと考えました。

   ```html
   <a>
      <s-box data-padding="1rem" data-border="1px_solid_black">
        <s-text data-color="!hover:blue">Link 1</s-text>
      <s-box>
    </a>
   ```

   この場合、テキストのホバー効果は`<a>`要素またはその親要素である`<s-box>`上でユーザーがホバーした時に適用することを望んでいると思います。しかし現在の Simplest ではそれを実現することができません。なぜなら、シャドウ DOM 内のスタイルはカプセル化されており、グローバルな状態にアクセスすることができないからです。
   私たちはこの問題を解決するために、グローバルな状態にアクセスすることが必要なスタイルに関しては`<head>`要素内に`<style>`を作成し、その内部に挿入することを検討しています。私たちの現在の草案がそのまま反映されれば以下のようになるでしょう。

   ```html
    <a data-simplest-id="PARENT_ID">
      <s-box
          data-padding="1rem;"
          data-border="1px_solid_black;"
      >
        <s-text
          data-color="!hover[#PARENT_ID]::blue;"
        >Link 1</s-text>
      <s-box>
    </a>
   ```

   これにより、以下のようなスタイルが生成されます。

   ```css
   *[data-simplest-id='PARENT_ID']:hover s-text::part(CHILD_ID) {
     color: blue;
   }
   ```

   このように、親要素の属性に `data-simplest-id` 属性を追加し、子要素の 状態ブロックにて Simple エリアを利用して親要素の ID を追加します。なお、CHILD_ID はレンダリング時に自動的にシャドウ DOM 内の要素(`<span>`または`<div>`)の`part`属性に割り当てられます。

   また、私たちは将来的に CSS の`@container`も強力にサポートしたいと考えており、`data-simplest-id` 属性はこの場面においても活躍できると期待しています。先ほどの例を少し変更した以下の例をご覧ください。

   ```html
    <s-container-factory
      data-containers="{PARENT_ID:inline}"
    ></s-container-factory>

    <a data-simplest-id="PARENT_ID">
      <s-box
          data-padding="1rem;"
          data-border="1px_solid_black;"
      >
        <s-text
          data-color="@container[#PARENT_ID(width>500px)]::blue;"
        >Link 1</s-text>
      <s-box>
    </a>
   ```

   まず、最上位に一つの`<s-container-factory>`要素を配置し、これが持つ`data-containers`属性を利用してコンテナ ID とコンテナタイプのオブジェクトを作成しているのが分かります。
   これにより`<head>`要素内の`<style>`要素に以下の CSS が挿入されます。

   ```css
   *[data-simplest-id='PARENT_ID'] {
     container-name: PARENT_ID;
     container-type: inline-size;
   }
   ```

   そして、`<s-text>`要素の`data-color`属性の値に注目すると、クエリブロックに新しい Simple エリアが追加されていることが分かります。ここで`#`の後に親ブロック名を記述し、その後に条件を続けることで以下の CSS が生成されます。

   ```css
   @container PARENT_ID (width > 500px) {
     s-text::part(CHILD_ID) {
       color: blue;
     }
   }
   ```

   私たちはこのように`data-simplest-id`属性を用いることで、CSS の表現力を十分に活かしながら非常に柔軟なインラインスタイリングを提供することを可能に出来たらよいと考えています。

4. **いくつかの CSS プロパティはまだサポートされていない**

   代表例として、transform プロパティを取り上げると、これは追加のロジックを必要とするため実装するには少し時間がかかります。私たちの草案は以下のようになります。

   ```html
   <data-transform
     data-translate="x=1rem;"
     data-rotate="45deg;"
     data-scale="1.5|z=2;"
     >[SOME_CONTENT]</data-transform
   >
   ```

   このように、`<data-transform>`要素を使用すると transform プロパティを直感的に利用することが可能になります。

## コンポーネントとカスタム属性一覧

- **ベース(すべてのコンポーネントで利用可能)**

  | 属性           | CSS プロパティ |
  | -------------- | -------------- |
  | `outline`      | `outline`      |
  | `data-display` | `display`      |

- `s-text`

  | 属性                  | CSS プロパティ    |
  | --------------------- | ----------------- |
  | `data-color`          | `color`           |
  | `data-align`          | `text-align`      |
  | `data-size`           | `font-size`       |
  | `data-weight`         | `font-weight`     |
  | `data-family`         | `font-family`     |
  | `data-style`          | `font-style`      |
  | `data-line-height`    | `line-height`     |
  | `data-decoration`     | `text-decoration` |
  | `data-transform`      | `text-transform`  |
  | `data-shadow`         | `text-shadow`     |
  | `data-letter-spacing` | `letter-spacing`  |
  | `data-word-spacing`   | `word-spacing`    |
  | `data-word-break`     | `word-break`      |
  | `data-writing-mode`   | `writing-mode`    |
  | `data-vertical-align` | `vertical-align`  |

- `s-bg`

  | 属性              | CSS プロパティ          |
  | ----------------- | ----------------------- |
  | `data-color`      | `background-color`      |
  | `data-image`      | `background-image`      |
  | `data-position`   | `background-position`   |
  | `data-repeat`     | `background-repeat`     |
  | `data-attachment` | `background-attachment` |
  | `data-clip`       | `background-clip`       |
  | `data-blend-mode` | `background-blend-mode` |
  | `data-size`       | `background-size`       |

- `s-box`

  | 属性               | CSS プロパティ |
  | ------------------ | -------------- |
  | `data-width`       | `width`        |
  | `data-height`      | `height`       |
  | `data-inline-size` | `inline-size`  |
  | `data-block-size`  | `block-size`   |
  | `data-padding`     | `padding`      |
  | `data-margin`      | `margin`       |
  | `data-border`      | `border`       |
  | `data-position`    | `position`     |
  | `data-top`         | `top`          |
  | `data-right`       | `right`        |
  | `data-bottom`      | `bottom`       |
  | `data-left`        | `left`         |
  | `data-sizing`      | `box-sizing`   |
  | `data-shadow`      | `box-shadow`   |
  | `data-overflow`    | `overflow`     |
  | `data-z-index`     | `z-index`      |
  | `data-aspectRatio` | `aspect-ratio` |

- **layoutBox (`data-flex`と`s-grid`コンポーネントで継承されている)**

  | 属性                   | CSS プロパティ    |
  | ---------------------- | ----------------- |
  | `data-align-content`   | `align-content`   |
  | `data-align-items`     | `align-items`     |
  | `data-justify-content` | `justify-content` |
  | `data-justify-items`   | `justify-items`   |
  | `data-place-content`   | `place-content`   |
  | `data-place-items`     | `place-items`     |
  | `data-gap`             | `gap`             |

  - `data-flex`

    | 属性             | CSS プロパティ   |
    | ---------------- | ---------------- |
    | `data-direction` | `flex-direction` |
    | `data-wrap`      | `flex-wrap`      |
    | `data-flow`      | `flex-flow`      |

  - `s-grid`

    | 属性                | CSS プロパティ          |
    | ------------------- | ----------------------- |
    | `data-columns`      | `grid-template-columns` |
    | `data-rows`         | `grid-template-rows`    |
    | `data-areas`        | `grid-template-areas`   |
    | `data-auto-columns` | `grid-auto-columns`     |
    | `data-autor-rows`   | `grid-auto-rows`        |
    | `data-auto-flow`    | `grid-auto-flow`        |

- **layoutItem (`data-flex-item`と`s-grid-item`コンポーネントで継承されている)**

  | 属性              | CSS プロパティ |
  | ----------------- | -------------- |
  | `data-align-self` | `align-self`   |
  | `data-order`      | `order`        |

  - `data-flex-item`

    | 属性          | CSS プロパティ |
    | ------------- | -------------- |
    | `data-grow`   | `flex-grow`    |
    | `data-shrink` | `flex-shrink`  |
    | `data-basis`  | `flex-basis`   |

  - `s-grid-item`

    | 属性                | CSS プロパティ |
    | ------------------- | -------------- |
    | `data-justify-self` | `justify-self` |
    | `data-column`       | `grid-column`  |
    | `data-row`          | `grid-row`     |
    | `data-area`         | `grid-area`    |

- `s-effect`

  | 属性                   | CSS プロパティ    |
  | ---------------------- | ----------------- |
  | `data-opacity`         | `opacity`         |
  | `data-filter`          | `filter`          |
  | `data-backdrop-filter` | `backdrop-filter` |
  | `data-blend-mode`      | `blend-mode`      |
  | `data-clip-path`       | `clip-path`       |

## ペアの状態を持つことができるプロパティ

| 属性               | 例                              |
| ------------------ | ------------------------------- |
| `data-outline`     | `data-outline="offset=2px;"`    |
| `data-width`       | `data-width="max=500px;"`       |
| `data-height`      | `data-height="min=500px;"`      |
| `data-inline-size` | `data-inline-size="max=500px;"` |
| `data-block-size`  | `data-block-size="min=500px;"`  |
| `data-padding`     | `data-padding="top=1rem;"`      |
| `data-margin`      | `data-margin="top=1rem;"`       |
| `data-border`      | `data-border="radius=50%;"`     |
| `data-overflow`    | `data-overflow="x=hidden;"`     |
| `data-gap`         | `data-gap="column=1rem;"`       |

## 例

- **テキストを装飾する**

  ```html
  <s-text data-color="red;" data-size="1rem;" data-weight="bold;"
    >[SOME_TEXT]
  </s-text>
  ```

- **背景を装飾する**

  ```html
  <s-bg data-color="url({../../cat.png});" data-size="cover;">
    [SOME_CONTENT]</s-bg
  >
  ```

- **レイアウトを作る**

  - Box:

    ```html
    <s-box
      data-padding="1rem;"
      data-margin="1rem;"
      data-border="1px_solid_black;"
      >[SOME_CONTENT]
    </s-box>
    ```

  - Flex:

    ```html
    <data-flex
      data-justify-content="center;"
      data-align-items="center;"
      data-gap="1rem;"
    >
      <data-flex-item data-align-self="end;" data-order="1;"
        >[SOME_CONTENT]</data-flex-item
      >
    </data-flex>
    ```

  - Grid:

    ```html
    <s-grid data-columns="0.5fr_1fr_0.5fr;" data-gap="1rem;">
      <s-grid-item data-justify-self="center;" data-order="1;"
        >[SOME_CONTENT]</s-grid-item
      >
    </s-grid>
    ```

- **エフェクトを追加する**

  ```html
  <s-effect data-opacity="[trans(300ms,ease-in)] !hover::0.8;">
    [SOME_CONTENT]
  </s-effect>
  ```

## 貢献方法

私たちのプロジェクトへの興味と貢献を考えてくれてありがとうございます！このセクションでは、どのようにして貢献できるか、そしてそのプロセスがどのように進むかについて説明します。

### 貢献のやり方

- **バグ報告**：プロジェクトを使用中にバグを見つけた場合は、[Issue を作成](https://github.com/cat394/simplest/issues)して報告してください。
- **機能提案**：新しい機能のアイデアがある場合は、まず[Issue を作成](https://github.com/cat394/simplest/issues)してディスカッションを始めてください。
- **コードを書く**：既存の Issue に取り組むか、自分で新しい Issue を作成し、Pull Request（PR）を送ってください。

### プルリクエストのプロセス

1. プロジェクトの最新の`main`ブランチから新しいブランチを作成してください。
2. あなたの変更をコミットし、変更が何をするものか明確に説明するコミットメッセージを書いてください。
3. あなたのブランチに変更をプッシュした後、プロジェクトに対してプルリクエストを作成してください。
4. プルリクエストの説明には、変更の理由とその影響を詳細に説明してください。
5. レビューのフィードバックがあれば、対応して変更を加えてください。

### コード規約

#### コーディングスタイル

- **可読性優先**: コードは清潔かつ読みやすいものにします。適切なインデント、スペース、命名規則を使用します。
- **一貫性**: プロジェクト全体で一貫したコーディングスタイルを保持します。既存のコードを参照して、スタイルを一致させます。

#### 命名規則

- **明瞭な命名**: 変数、関数、クラスの名前は、その目的や動作を明確に反映させます。
- **キャメルケース使用**: 変数や関数名には`lowerCamelCase`を、クラス名には`UpperCamelCase`を使用します。

#### コード構造

- **関数とクラス**: 小さく、再利用可能な関数とクラスにコードを分割します。一つの関数は一つの機能のみを担当します。
- **モジュール性**: コードはモジュール性を意識して構造化します。関連する機能は同じファイルやモジュール内にまとめます。

#### 詳しい説明

PR される関数やクラスは、その目的、引数、返り値について詳しく述べてください。

#### テスト

- **自動テストの実装**: 単体テストや統合テストを実装し、コードの信頼性を保証します。テストはコードの変更ごとに実行します。

#### パフォーマンス

- **効率的なコード**: パフォーマンスを意識したコーディング。不要な計算やリソースの浪費を避けます。

### コミュニケーション

- 質問やディスカッションのためには、[GitHub Discussions](https://github.com/cat394/simplest/discussions)を利用してください。
- 貢献に関する特定の質問がある場合は、直接[メンテナーに連絡](ryo.crox9@passinbox.com)してください。

皆さんの貢献を心よりお待ちしています！

## ライセンス

MIT License

</details>

> The following text was translated from Japanese to English by ChatGPT. Therefore, you may see many grammatical errors.

## What is Simplest?

Simplest utilizes [Lit](https://lit.dev/)'s attribute converter to transform attribute values into CSS, which is then inserted into the style element within the Shadow DOM. This process enables flexible inline styling.

## Terminology

- **Simplest and Simple**

  We provide components starting with the `s-` prefix, and styling begins with the attributes associated with these. These attribute values are called **Simplest**, which are composed of units called **Simple**, separated by spaces. For example:

  ```html
  <s-text data-color="red; !hover::blue; @media(width>500px)::green;"
    >Hello</s-text
  >
  ```

  In this code, `"red; !hover::blue; @media(width>500px)::green;"` is Simplest, and `red;`, `!hover::blue;`, `@media(width>500px)::green;` are each Simple.

- **Blocks**

  Simple can consist of three blocks: **STYLE**, **STATE**, and **QUERY**, each separated by `::`. In the example above, `red;` is composed solely of a STYLE block, `!hover::blue` consists of a STATE block and a STYLE block, and `@media(width>500px)::green;` is composed of a QUERY block and a STYLE block.

  - **STYLE Block**

    This block is where you write the style content, expressed in two patterns: **Single** and **Pair**. Single consists of a single configuration, like `red`, `center`, `10px`. Pair consists of a key and value, separated by `=`, used for partial styling of a property. For example, to apply style only to the top of the margin property, you would write `top=10px`.

  - **STATE Block**

    This area starts with `!` and is used to apply styles based on the state of an element. For instance, if you want to change the text color when a user hovers over an element, you would add a block like `!hover`.

  - **QUERY Block**

    This area starts with `@` and can describe CSS @rules. For example, to change styles based on the user's device width, you create a block like `@media(width>500px)`.

## Rules

There are several rules for Simple:

1. **End with `;`**

   This is to avoid parsing incomplete Simple.

2. **Do not place spaces**

   Simplest uses spaces as separators to divide into each Simple, which are then parsed individually. Therefore, spaces within Simple are not allowed. If space is needed, use `_` instead.

3. **Write each block in order**

   Simple is written in the order of QUERY block, STATE block, and STYLE block. This is because they form the CSS nesting structure in the order they are written.

## Introduction to Special Areas

### Simple Area

You can add a special region called `Simple Area` in Simple. It is created by enclosing with `[` and `]`, which enhances inline styling powerfully. Currently, it only supports the pseudo-function named `trans`, providing a concise way to describe the transition property. For instance, if you want to smoothly transition the color change of text, you can write Simple as follows:

```html
<s-text data-color="red[trans(300ms,ease-in)]; !hover::blue;">Hello</s-text>
```

In this code, `[trans(300ms,ease-in)]` corresponds to the Simple Area. The trans pseudo-function takes the transition property value as an argument and must be written in the order of duration, timing-function, delay. In the example code above, the following CSS will be added to the style element within the Shadow DOM:

```css
:host {
  color: red;
  transition: color 300ms ease-in;
}
:host(:hover) {
  color: blue;
}
```

### Protected Area

Each Simple will process to place spaces before and after the arithmetic operators it contains. Sometimes, this process may unintentionally apply to areas not intended, and the Protected Area is useful in such cases. This area temporarily becomes a placeholder before the arithmetic operator processing and is restored after the above process. For example, consider when a URL is included in Simple as follows:

```html
<s-bg data-image="url(../../cat.png);"></s-bg>
```

At first glance, this seems like a valid Simple, but it will generate unexpected styles as shown below:

```css
:host {
  background-image: url(.. / .. / cat.png);
}
```

Therefore, it is necessary to use a Protected Area, which can be created by enclosing with `{` and `}`. Let's correct the above example:

```html
<s-bg data-image="url({../../cat.png});"></s-bg>
```

This will generate a valid style:

```css
:host {
  background-image: url(../../cat.png);
}
```

By utilizing the Protected Area, you were able to create a region that should not be formatted.

## Chains

When dealing with properties in the style area that can hold pairs of states, there are two methods to manage multiple properties within a single Simplest. The first method treats each as an individual Simple, declaring them with spaces in between. The second method involves using **Chains**, which allows for including multiple properties within a single Simple. For instance, if you wish to set both the border-width and border-color values, you could consider the following approaches:

1. **As Individual Simples**

   This approach might feel very natural.

   ```html
   <s-box data-border="width=1px; color=red;">[SOME_CONTENT]</s-box>
   ```

   However, there's a drawback to this method. Since it declares each as a separate Simple, it results in generating separate CSS blocks for each property, which is inefficient.

   ```css
   :host {
     border-width: 1px;
   }
   :host {
     border-color: red;
   }
   ```

   This inefficiency can be overcome by consolidating these properties into a single Simple using Chains.

2. **Using Chains**

   Chains allow you to express multiple properties within a single Simple by separating each property with `|`. For the example given above, you could write:

   ```html
   <s-box data-border="width=1px|color=red;">[SOME_CONTENT]</s-box>
   ```

   This would generate a single CSS block containing both properties:

   ```css
   :host {
     border-width: 1px;
     border-color: red;
   }
   ```

   Furthermore, Chains are beneficial when you want to apply the same style across multiple states, such as focus and hover. For example, if you want to apply the same style when a user focuses on an element and when they hover over it, you might initially consider:

   ```html
   <s-text data-color="!focus::red; !hover::red;">Hello</s-text>
   ```

   While this is a valid Simplest and functional, declaring the same value individually is inefficient. By using Chains, you can simplify this to:

   ```html
   <s-text data-color="!focus|hover::red;">Hello</s-text>
   ```

   This generates a more efficient CSS:

   ```css
   :host(:focus),
   :host(:hover) {
     color: red;
   }
   ```

   Additionally, if you wish to apply styles only when all specified states are true, you can do so as follows:

   ```html
   <s-text data-color="!focus:hover::blue;">Hello</s-text>
   ```

   Resulting in:

   ```css
   :host(:focus:hover) {
     color: blue;
   }
   ```

   Thus, using Chains allows for the efficient handling of multiple properties and states.

## How does it work?

> The analysis logic itself changes over time, but we wanted to demonstrate our commitment to improving based on this simplicity.

Simplest generates styles with a very simple logic.

Web components can receive data from external sources in the form of _property_.And all the components we provide are built on top of Lit, which offers various options for properties.

We focused on the custom attribute converter among them. Originally intended to be used for converting data types between attributes and properties, we found it interesting to convert attribute values into a different form before treating them as properties within the component instance, and we adopted this as our current processing method.
What we do is create attribute values into an AST and interpret it into CSS, and we believe this approach will not change in the future.
Let me explain the flow of the process with a concrete example.

Let's say we create a `<s-text>` element like the following:

```html
<s-text data-color="red; @media(width>500px)::!hover::blue;">Hello</s-text>
```

Simplest performs the processing through the following three main functions:

- simplestConverter
- generateAST
- generateCSS

1. **simplestConverter**

   This function validates whether the attribute value is suitable for future processing and breaks down Simplest into each Simple. Then it passes them to the generateAST function, and then passes the returned nodes to the generateCSS function, and finally returns the CSS string as the value of the property.

   1. **Trimming**

      Extra spaces are removed.

      ```js
      const simplest = 'red; @media(width>500px)::!hover::blue);';
      ```

   2. **Breaking down into Simples**

      Simplest is divided into each Simple using spaces as separators.

      ```js
      const simples = ['red;', '@media(width>500px)::!hover::blue);'];
      ```

   3. **Processing Simples**

      1. Checking the end of Simple

         If it ends with `;`, it is determined as a valid Simple.

         ```js
         simple = 'red';
         simple = '@media(width>500px)::!hover::blue';
         ```

      2. Processing the `_` that connects multiple values

         All `_` are replaced with a single space.

      3. Processing operators

         CSS variables and protected areas are placeholderized, and spaces are placed on both sides of all arithmetic operators included in Simple.

         ```js
         simple = '@media(width > 500px)::!hover::blue';
         ```

      4. Creating an Abstract Syntax Tree (AST)

         The Simple is converted into the following nodes by the generateAST function.

         ```js
         // red
         ast = {
           block: 'root',
           value: '',
           child: {
             block: 'style',
             value: 'red',
             child: null,
           },
         };

         // @media(width > 500px)::!hover::blue
         ast = {
           block: 'root',
           value: '',
           child: {
             block: 'query',
             value: 'media(width > 500px)',
             child: {
               block: 'state',
               value: 'hover',
               child: {
                 block: 'style',
                 value: 'blue',
                 child: null,
               },
             },
           },
         };
         ```

      5. Converting AST to CSS

         The AST is passed to the generateCSS function along with the information called _prop_, processed, and passed as the value of the property.

         ```css
         :host {
           color: red;
         }
         :host:hover {
           color: blue;
         }
         ```

      6. Combining styles

         The values of each property present in the `<s-text>` element are combined and inserted into the `<style>` element within the shadow DOM during rendering.

2. **generateAST**

   It breaks down Simples into each block and converts them into the following nodes.

   ```ts
   class SimpleNode {
     child: SimpleNode | null = null;
     constructor(
       public block: 'root' | BlockName = 'root',
       public value: string = ''
     ) {}
     setChild(node: SimpleNode): void {
       this.child = node;
     }
   }
   ```

   If a block starts with `@`, it is considered as a QUERY block node. If it starts with `!`, it is considered as a STATE block node. Otherwise, it is considered as a STYLE block node.

3. **generateCSS**

   Traverse the AST and convert each block into the structure of CSS.

## Simplest's Issues and Proposed Fixes

While the logic of Simplest is simple, there are still some points that have not yet reached practicality. However, we already have some proposed solutions to address these issues, so please take a look if you're interested.

1. **Regarding Testing**

   As of February 14, 2024, Simplest is being developed independently and has very few tests created. Therefore, it should be noted that there is a possibility of a long road to practical implementation.

2. **Inefficient CSS Generated by Multiple Attributes**

   By using chaining, there is no longer a need to generate the same CSS block for the same attribute. However, when multiple attributes are set in a single component, they are processed individually by the converter, resulting in the generation of duplicate CSS blocks. Let's consider the following `<s-box>` element as an example:

   ```html
   <s-box data-padding="top=10px;" data-margin="20px;">[SOME_CONTENT]</s-box>
   ```

   This will generate the following CSS:

   ```css
   :host {
     padding-top: 10px;
   }
   :host {
     margin: 20px;
   }
   ```

   To solve this problem, we plan to modify the logic to return the AST instead of converting it to CSS within the converter, and then convert them all at once to CSS during rendering, rather than individually. It may seem that there is no longer a need to use chaining within the STYLE block with this logic transition. However, since new nodes are still being generated using this method, there is still a possibility of inefficient processing. Additionally, we strongly recommend using chaining because we believe that each Simple should be independent. Let's take a look at the following example:

   ```html
   <s-box
     data-padding="10px; @media(width>500px)::20px; top=15px !hover::left=10px; bottom=30px;"
     >[CONTENT]</s-box
   >
   ```

   This code can be very confusing. Mixing conditional styles with static styles is very messy. Therefore, we recommend using chaining. The refactored code using chaining would look like this:

   ```html
   <s-box
     data-padding="10px|top=15px|bottom=30px; @media(width>500px)::20px; !hover::left=10px;"
     >[CONTENT]</s-box
   >
   >
   ```

   In situations where chaining is possible, it is always recommended to stick to this writing style.

3. **Child elements cannot listen to parent element events**

   Currently, all styles are generated within the Shadow DOM, so child elements cannot apply styling based on the state of the parent element. This is a major factor preventing Simplest from entering practical stages. For example, let's say you want to create a link that looks like a button.

   ```html
   <a>
   <s-box data-padding="1rem" data-border="1px_solid_black">
      <s-text data-color="!hover:blue">Link 1</s-text>
   <s-box>
   </a>
   ```

   In this case, you would expect the hover effect on the text to be applied when the user hovers over the `<a>` element or its parent element, `<s-box>`. However, this cannot be achieved in the current version of Simplest. This is because styles within the Shadow DOM are encapsulated and cannot access global states.
   To solve this problem, we are considering creating a `<style>` within the `<head>` element for styles that require access to global states. If our current proposal is implemented as is, it would look like the following:

   ```html
   <a data-simplest-id="PARENT_ID">
   <s-box
         data-padding="1rem;"
         data-border="1px_solid_black;"
   >
      <s-text
         data-color="!hover[#PARENT_ID]::blue;"
      >Link 1</s-text>
   <s-box>
   </a>
   ```

   This would generate the following style:

   ```css
   *[data-simplest-id='PARENT_ID']:hover s-text::part(CHILD_ID) {
     color: blue;
   }
   ```

   In this way, we add the `data-simplest-id` attribute to the parent element's attributes and use the Simple area in the child element's state block to add the parent element's ID. Note that CHILD_ID is automatically assigned to the `part` attribute of the element (`<span>` or `<div>`) within the Shadow DOM during rendering.

   Additionally, we also plan to strongly support CSS `@container` in the future, and we expect the `data-simplest-id` attribute to be useful in this context as well. Please take a look at the following modified example:

   ```html
   <s-container-factory
   data-containers="{PARENT_ID:inline}"
   ></s-container-factory>

   <a data-simplest-id="PARENT_ID">
   <s-box
         data-padding="1rem;"
         data-border="1px_solid_black;"
   >
      <s-text
         data-color="@container[#PARENT_ID(width>500px)]::blue;"
      >Link 1</s-text>
   <s-box>
   </a>
   ```

   First, you can see that we place a `<s-container-factory>` element at the top level and use its `data-containers` attribute to create an object with the container ID and container type. This will insert the following CSS into the `<style>` element within the `<head>` element:

   ```css
   *[data-simplest-id='PARENT_ID'] {
     container-name: PARENT_ID;
     container-type: inline-size;
   }
   ```

   And when we focus on the value of the `data-color` attribute of the `<s-text>` element, we can see that a new Simple area is added to the query block. Here, by writing the parent block name after `#` and continuing with the conditions, the following CSS is generated.

   ```css
   @container PARENT_ID (width > 500px) {
     s-text::part(CHILD_ID) {
       color: blue;
     }
   }
   ```

   We believe that by using the `data-simplest-id` attribute in this way, we can provide highly flexible inline styling while fully utilizing the expressive power of CSS.

4. **Some CSS properties are not yet supported**

   It will take some time to support the transform property. This is because implementing it requires additional logic to the existing Simplest processing. Our proposal is as follows.

   ```html
   <data-transform
     data-translate="x=1rem;"
     data-rotate="45deg;"
     s-scale="1.5|z=2;"
     >[SOME_CONTENT]</data-transform
   >
   ```

   Using the `<data-transform>` element like this allows for intuitive use of the transform property.

## Components and attributes

- **base (Inherited by all components)**

  | attribute      | CSS property |
  | -------------- | ------------ |
  | `data-outline` | `outline`    |

- `s-text`

  | attribute             | CSS property      |
  | --------------------- | ----------------- |
  | `data-color`          | `color`           |
  | `data-align`          | `text-align`      |
  | `data-size`           | `font-size`       |
  | `data-weight`         | `font-weight`     |
  | `data-family`         | `font-family`     |
  | `data-style`          | `font-style`      |
  | `data-line-height`    | `line-height`     |
  | `data-decoration`     | `text-decoration` |
  | `data-transform`      | `text-transform`  |
  | `data-shadow`         | `text-shadow`     |
  | `data-letter-spacing` | `letter-spacing`  |
  | `data-word-spacing`   | `word-spacing`    |
  | `data-word-break`     | `word-break`      |
  | `data-writing-mode`   | `writing-mode`    |
  | `data-vertical-align` | `vertical-align`  |

- `s-bg`

  | attribute         | CSS property            |
  | ----------------- | ----------------------- |
  | `data-color`      | `background-color`      |
  | `data-image`      | `background-image`      |
  | `data-position`   | `background-position`   |
  | `data-repeat`     | `background-repeat`     |
  | `data-attachment` | `background-attachment` |
  | `data-clip`       | `background-clip`       |
  | `data-blend-mode` | `background-blend-mode` |
  | `data-size`       | `background-size`       |

- `s-box`

  | attribute           | CSS property   |
  | ------------------- | -------------- |
  | `data-display`      | `display`      |
  | `data-width`        | `width`        |
  | `data-height`       | `height`       |
  | `data-inline-size`  | `inline-size`  |
  | `data-block-size`   | `block-size`   |
  | `data-padding`      | `padding`      |
  | `data-margin`       | `margin`       |
  | `data-border`       | `border`       |
  | `data-position`     | `position`     |
  | `data-top`          | `top`          |
  | `data-right`        | `right`        |
  | `data-bottom`       | `bottom`       |
  | `data-left`         | `left`         |
  | `data-sizing`       | `box-sizing`   |
  | `data-shadow`       | `box-shadow`   |
  | `data-overflow`     | `overflow`     |
  | `data-z-index`      | `z-index`      |
  | `data-aspect-ratio` | `aspect-ratio` |

- **layoutBox (Inherited by `data-flex` and `s-grid` components)**

  | attribute              | CSS property      |
  | ---------------------- | ----------------- |
  | `data-align-content`   | `align-content`   |
  | `data-align-items`     | `align-items`     |
  | `data-justify-content` | `justify-content` |
  | `data-justify-items`   | `justify-items`   |
  | `data-place-content`   | `place-content`   |
  | `data-place-items`     | `place-items`     |
  | `data-gap`             | `gap`             |

  - `data-flex`

    | attribute        | CSS property     |
    | ---------------- | ---------------- |
    | `data-direction` | `flex-direction` |
    | `data-wrap`      | `flex-wrap`      |
    | `data-flow`      | `flex-flow`      |

  - `s-grid`

    | attribute           | CSS property            |
    | ------------------- | ----------------------- |
    | `data-columns`      | `grid-template-columns` |
    | `data-rows`         | `grid-template-rows`    |
    | `data-areas`        | `grid-template-areas`   |
    | `data-auto-columns` | `grid-auto-columns`     |
    | `data-autor-rows`   | `grid-auto-rows`        |
    | `data-auto-flow`    | `data-auto-flow`        |

- **layoutItem (Inherited by `data-flex-item` and `s-grid-item` components)**

  | attribute         | CSS property |
  | ----------------- | ------------ |
  | `data-align-self` | `align-self` |
  | `data-order`      | `order`      |

  - `data-flex-item`

    | attribute     | CSS property  |
    | ------------- | ------------- |
    | `data-grow`   | `flex-grow`   |
    | `data-shrink` | `flex-shrink` |
    | `data-basis`  | `flex-basis`  |

  - `s-grid-item`

    | attribute           | CSS property   |
    | ------------------- | -------------- |
    | `data-justify-self` | `justify-self` |
    | `data-column`       | `grid-column`  |
    | `data-row`          | `grid-row`     |
    | `data-area`         | `grid-area`    |

- `s-effect`

  | attribute              | CSS property      |
  | ---------------------- | ----------------- |
  | `data-opacity`         | `opacity`         |
  | `data-filter`          | `filter`          |
  | `data-backdrop-filter` | `backdrop-filter` |
  | `data-blend-mode`      | `blend-mode`      |
  | `data-clip-path`       | `clip-path`       |

## Shorthand property

| property          | example                                     |
| ----------------- | ------------------------------------------- |
| `outline`         | `data-outline="1px_solid_black;"`           |
| `text-decoration` | `data-decoration="underline_dotted_black;"` |
| `padding`         | `data-padding="1rem;"`                      |
| `margin`          | `data-margin="1rem;"`                       |
| `border`          | `data-border="1px_solid_black;"`            |
| `gap`             | `data-gap="1rem;"`                          |

## Property that can have paired state

| attribute          | example                         |
| ------------------ | ------------------------------- |
| `data-outline`     | `data-outline="offset=2px;"`    |
| `data-width`       | `data-width="max=500px;"`       |
| `data-height`      | `data-height="min=500px;"`      |
| `data-inline-size` | `data-inline-size="max=500px;"` |
| `data-block-size`  | `data-block-size="min=500px;"`  |
| `padding`          | `data-padding="top=1rem;"`      |
| `margin`           | `data-margin="top=1rem;"`       |
| `data-border`      | `data-border="radius=50%;"`     |
| `data-overflow`    | `data-overflow="x=hidden;"`     |
| `data-gap`         | `data-gap="column=1rem;"`       |

## Examples

- **Style text**

  ```html
  <s-text data-color="red;" data-size="1rem;" data-weight="bold;"
    >[SOME_TEXT]
  </s-text>
  ```

- **Style background**

  ```html
  <s-bg data-color="url({../../cat.png});" data-size="cover;">
    [SOME_CONTENT]</s-bg
  >
  ```

- **Style layout**

  - Box:

    ```html
    <s-box
      data-padding="1rem;"
      data-margin="1rem;"
      data-border="1px_solid_black;"
      >[SOME_CONTENT]
    </s-box>
    ```

  - Flex:

    ```html
    <data-flex
      data-justify-content="center;"
      data-align-items="center;"
      data-gap="1rem;"
    >
      <data-flex-item data-align-self="end;" data-order="1;"
        >[SOME_CONTENT]</data-flex-item
      >
    </data-flex>
    ```

  - Grid:

    ```html
    <s-grid data-columns="0.5fr_1fr_0.5fr;" data-gap="1rem;">
      <s-grid-item data-justify-self="center;" data-order="1;"
        >[SOME_CONTENT]</s-grid-item
      >
    </s-grid>
    ```

- **Style effect**

  ```html
  <s-effect data-opacity="[trans(300ms,ease-in)] !hover::0.8;">
    [SOME_CONTENT]
  </s-effect>
  ```

## Contribution methods

Thank you for considering your interest and contribution to our project! In this section, we will explain how you can contribute and how the process will proceed.

### Ways to Contribute

- **Bug Reporting**: If you find any bugs while using the project, please create an [Issue](https://github.com/cat394/simplest/issues) to report it.
- **Feature Suggestions**: If you have ideas for new features, please start a [Discussion](https://github.com/cat394/simplest/issues) by creating an Issue.
- **Writing Code**: Work on existing Issues or create new ones and submit a Pull Request (PR).

### Pull Request Process

1. Create a new branch from the latest `main` branch of the project.
2. Commit your changes and write a commit message that clearly explains what the changes do.
3. After pushing your changes to your branch, create a Pull Request for the project.
4. In the Pull Request description, provide a detailed explanation of the reasons for the changes and their impact.
5. If there is feedback from the review, make the necessary changes accordingly.

### Code Conventions

#### Coding Style

- **Prioritize Readability**: Code should be clean and easy to read. Use appropriate indentation, spacing, and naming conventions.
- **Consistency**: Maintain a consistent coding style throughout the project. Refer to existing code to align styles.

#### Naming Conventions

- **Clear Naming**: Names of variables, functions, and classes should clearly reflect their purpose or behavior.
- **CamelCase Usage**: Use `lowerCamelCase` for variables and functions, and `UpperCamelCase` for class names.

#### Code Structure

- **Functions and Classes**: Break down code into small, reusable functions and classes. Each function should handle a single functionality.
- **Modularity**: Structure code with modularity in mind. Group related functionalities within the same file or module.

#### Detailed explanation

You should describe in detail the purpose, arguments, and return value of the function or class being PRed.

#### Testing

- **Implement Automated Tests**: Implement unit and integration tests to ensure code reliability. Run tests with every code change.

#### Performance

- **Efficient Code**: Code with performance in mind. Avoid unnecessary calculations and resource wastage.

#### Communication

- For questions and discussions, please use [GitHub Discussions](https://github.com/cat394/simplest/discussions).
- If you have specific questions regarding contributions, please contact the [maintainer](ryo.crox9@passinbox.com) directly.

We are looking forward to your contributions!

## License

MIT License
