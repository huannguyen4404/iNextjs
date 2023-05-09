---
slug: csr-ssr-ssg-isr
title: Page Rendering CSR, SSR, SSG and ISR 
author: Huan
author_title: Dev cỏ
author_url: https://github.com/huannguyen4404
author_image_url: https://avatars.githubusercontent.com/u/13743628?s=400&u=4066e68fa42b95987923b148bb8d4eaad084026b&v=4
image:
tags: [nextjs, page rendering]
date: '2023-05-09T14:00:00Z'
---

Page rendering: CSR / SSR / SSG and ISR 🧐

<!-- truncate-->

## Agenda


## Cheatsheet
- To overview type of page rendering in Nextjs: [https://guydumais.digital/blog/next-js-the-ultimate-cheat-sheet-to-page-rendering](https://guydumais.digital/blog/next-js-the-ultimate-cheat-sheet-to-page-rendering)


## Automatic Static Optimization
- Nextjs tự detect coi page này có là static hay không bằng cách xem nếu `KHÔNG CÓ` xài 2 methods sau: `getServerSideProps()` và `setInitialProps()` (cái thứ 2 hình như `predecated` rồi).


## Static-Site Generation (SSG)
- Nextjs default / recommend cách này nếu có thể vì nó có performance tốt nhất (thông số `Time to First Byte` (TTFB) thấp nhất)
- Nếu có fetching data, thì xử lý ở 2 methods: `getStaticProps()` và `getStaticPaths()`
- Nextjs sẽ xử lý fetching và render luôn thành html `chỉ` ở lúc build time.


## Server Side Rendering (SSR)
- Ngược lại với SSG, cách này Nextjs khuyên `hạn chế` xài nhiều nhất có thể vì TTFB lớn. Nextjs không generate ra html sẵn cho SSR, khi client side request lên Next server mới xử lý lấy data các kiểu ở method `getServerSideProps()` --> khi xài method này, nghĩa là đang dùng SSR.
- Nếu muốn CDN caching cho page dùng SSR: set header `Cache-Control`, coi lại để biết tác dụng của `stale-while-revalidate`
```tsx
export async function getServerSideProps(context) {
    context.res.setHeader(
      'Cache-Control',
      's-maxage=5'
      // 's-maxage=5, stale-while-revalidate'
      // 's-maxage=5, stale-while-revalidate=5'
    )
}
```



## Client Side Rendering (CSR)
- Giống như `SSG` nhưng 1 số phần của content không build sẵn mà được lấy từ phía client.
- ví dụ 1 số components `chỉ render phía client` bằng cách dynamic import với `ssr: false`
```tsx
import dynamic from 'next/dynamic'

const DynamicComponentNoSSR = dynamic(
  () => import('../components/hello'),
  {ssr: false}
)

function Home() {
  return (
    <div><DynamicComponentNoSSR /></div>
  )
}

export default Home
```


## Incremental Static Regeneration (ISR)
- Giống như `SSG` ngoại trừ content có thể rebuilt khi page được cập nhật.
- Thực hiện ISR khi ở hàm `getStaticProps()` có set option `revalidate`
- Ngoài ra, khi page dạng ISR đang chưa được cache, có thể chọn cách xử lý bằng option `fallback` trong `getStaticPaths()`, khi đang fallback (giả sử lúc này đang gọi API, thì `router.isFallback == true`)

--- 
