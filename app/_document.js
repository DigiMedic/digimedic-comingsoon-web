import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Fibr Script Starts */}
          <link rel="preconnect" href="https://cdn.fibr.shop" />
          <link rel="dns-prefetch" href="https://cdn.fibr.shop" />
          <script dangerouslySetInnerHTML={{
            __html: `
              localStorage.setItem('__fibr_current_url',window.location.href);
              document.head.append(Object.assign(document.createElement('style'),{id:'fibr-async-img-style',innerHTML:"img { opacity: 0; }"}));
              setTimeout(() => { const e = document.getElementById("fibr-async-img-style"); e && (e.innerHTML = "img{opacity:1;}") }, 2000);
              (function(f,i,b,r){var js,fjs=f.getElementsByTagName(i)[0];if(f.getElementById(r))return;js=f.createElement(i);js.id=r;js.src='https://cdn.fibr.shop/sdks/client/'+b+'/fpt-client-sdk.min.js';f.getElementsByTagName('head')[0].insertBefore(js,fjs);}(document,'script','66e9c390b9fdc223bf1f8cf4','fibr-jssdk'));
            `
          }} />
          {/* Fibr Script Ends */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument