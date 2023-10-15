import React from "react"

export default function HTML(props) {
  return (
    <html lang={process.env.HTML_LANG || 'ru'}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* Site verification meta tag for https://webmaster.yandex.(com|ru) */}
        {process.env.YANDEX_VERIFICATION_CODE && <meta name="yandex-verification" content={process.env.YANDEX_VERIFICATION_CODE} />}
        {/* Extra meta tags */}
        {process.env.EXTRA_METATAGS ? (process.env.EXTRA_METATAGS.split(',').map(mt => {
          const [name, content] = mt.split(':');
          return <meta key={mt} name={name} content={content} />
        })) : ''}
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        {/* Yandex.Metrika counter code https://metrika.yandex.ru */}
        {process.env.METRIKA_TRACKING_ID && <script
          dangerouslySetInnerHTML={{
            __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              
                ym(${process.env.METRIKA_TRACKING_ID}, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true
                });
            `,
          }}
        />}
      </body>
    </html>
  )
}