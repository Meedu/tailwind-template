module.exports = {
  purge: {
    // @see https://www.tailwindcss.cn/docs/controlling-file-size
    // 控制tailwind文件大小
    // meedu插件视图目录
    enabled: process.env.DISABLE_TAILWIND_PURGE,
    content: [
      // '../../resources/views/**/*.blade.php',
    ]
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
