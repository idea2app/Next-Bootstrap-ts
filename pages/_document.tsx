import { parseCookie } from 'mobx-i18n';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

import type { LanguageCode } from '../models/Translation';

interface XDocumentProps {
  language: LanguageCode;
  colorScheme: 'light' | 'dark';
}

export default class XDocument extends Document<XDocumentProps> {
  static async getInitialProps(context: DocumentContext) {
    const props = await Document.getInitialProps(context),
      { language = 'zh-CN', colorScheme = 'light' } = parseCookie(
        context.req?.headers.cookie || '',
      );

    return { ...props, language, colorScheme };
  }

  render() {
    const { language, colorScheme } = this.props;

    return (
      <Html lang={language} data-bs-theme={colorScheme}>
        <Head>
          <link rel="icon" href="/favicon.ico" />

          <link rel="manifest" href="/manifest.json" />
          <script src="https://polyfill.web-cell.dev/feature/PWAManifest.js" />

          <link
            rel="stylesheet"
            href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
