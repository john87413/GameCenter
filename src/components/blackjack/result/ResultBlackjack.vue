<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 84.41">
    <path
      id="result-blackjack-balloon"
      d="M287,109.25H13a3,3,0,0,0-3,3V175a3,3,0,0,0,3,3H143l7.36,12.75L157.75,178H287a3,3,0,0,0,3-3V112.22A3,3,0,0,0,287,109.25Z"
      transform="translate(-10 -107.8)"
    />
    <g id="result-blackjack-text">
      <path
        d="M68,131.84H78.92A8.78,8.78,0,0,1,85.27,134a5.45,5.45,0,0,1,1.63,4v.07a5.79,5.79,0,0,1-3.47,5.42c2.85,1,4.83,2.61,4.83,5.91v.07c0,4.34-3.58,6.67-9,6.67H68Zm10,10.25c2.74,0,4.59-1.08,4.59-3.3v-.07c0-1.91-1.53-3.09-4.27-3.09H72.21v6.46Zm1.25,10.28c2.92,0,4.69-1.15,4.69-3.34V149c0-2.05-1.63-3.27-5-3.27H72.21v6.67Z"
        transform="translate(-10 -107.8)"
        fill="currentColor"
        class="text-gold"
      />
      <path
        d="M93.25,131.84h4.27v20.43h12.79v3.89H93.25Z"
        transform="translate(-10 -107.8)"
        fill="currentColor"
        class="text-gold"
      />
      <path
        d="M124,131.67h4l10.7,24.49H134.1l-2.47-5.87h-11.5l-2.5,5.87h-4.38Zm6.11,14.83-4.2-9.73-4.17,9.73Z"
        transform="translate(-10 -107.8)"
        fill="currentColor"
        class="text-gold"
      />
      <path
        d="M140,144.07V144a12.31,12.31,0,0,1,12.54-12.58,12.68,12.68,0,0,1,9.52,3.79l-2.74,3.16a9.67,9.67,0,0,0-6.81-3c-4.66,0-8,3.82-8,8.58V144c0,4.76,3.37,8.65,8,8.65,3,0,4.9-1.22,7-3.16l2.74,2.78a12.55,12.55,0,0,1-9.87,4.31A12.23,12.23,0,0,1,140,144.07Z"
        transform="translate(-10 -107.8)"
        fill="currentColor"
        class="text-gold"
      />
      <path
        d="M166.35,131.84h4.27v12.23l11.57-12.23h5.25L177.33,142.3l10.56,13.86h-5.18l-8.3-10.94-3.79,3.89v7.05h-4.27Z"
        transform="translate(-10 -107.8)"
        fill="currentColor"
        class="text-gold"
      />
      <path
        d="M189.18,152.58,192,149.7c1.42,1.81,2.85,2.85,4.9,2.85,2.29,0,3.86-1.53,3.86-4.76V131.84h4.38v16.05a8.81,8.81,0,0,1-2.26,6.46,8.12,8.12,0,0,1-5.91,2.15A9.16,9.16,0,0,1,189.18,152.58Z"
        transform="translate(-10 -107.8)"
        fill="currentColor"
        class="text-gold"
      />
      <path
        d="M218.34,131.67h4L233,156.16h-4.52L226,150.29h-11.5l-2.5,5.87h-4.38Zm6.11,14.83-4.2-9.73-4.17,9.73Z"
        transform="translate(-10 -107.8)"
        fill="currentColor"
        class="text-gold"
      />
      <path
        d="M234.34,144.07V144a12.31,12.31,0,0,1,12.54-12.58,12.68,12.68,0,0,1,9.52,3.79l-2.74,3.16a9.67,9.67,0,0,0-6.81-3c-4.66,0-8,3.82-8,8.58V144c0,4.76,3.37,8.65,8,8.65,3,0,4.9-1.22,7-3.16l2.75,2.78a12.55,12.55,0,0,1-9.87,4.31A12.23,12.23,0,0,1,234.34,144.07Z"
        transform="translate(-10 -107.8)"
        fill="currentColor"
        class="text-gold"
      />
      <path
        d="M260.74,131.84H265v12.23l11.57-12.23h5.25L271.72,142.3l10.56,13.86H277.1l-8.3-10.94L265,149.11v7.05h-4.27Z"
        transform="translate(-10 -107.8)"
        fill="currentColor"
        class="text-gold"
      />
    </g>
    <g id="result-blackjack-moon">
      <path
        d="M36.75,125c-.38,0-.76,0-1.14,0a16.82,16.82,0,1,1-17.85,17.85c0,.38,0,.76,0,1.14a19,19,0,1,0,19-19Z"
        transform="translate(-10 -107.8)"
        fill="currentColor"
        class="text-gold"
      />
      <path
        d="M34.54,158.61A16.82,16.82,0,0,0,35.61,125a19,19,0,0,0-17.85,17.85A16.82,16.82,0,0,0,34.54,158.61Z"
        transform="translate(-10 -107.8)"
        fill="currentColor"
        class="text-gold"
        opacity="0.25"
      />
    </g>
  </svg>
</template>

<style scoped>
#result-blackjack-moon {
  animation: moonrise 1s ease;
  transform: scale(100%);
  transform-origin: center;
  transform-box: fill-box;
}
@keyframes moonrise {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(0);
  }
  100% {
    transform: scale(100%);
  }
}
</style>
