<script lang="ts"></script>

<header>
    <!-- Ported from thingblock-editor's thingblock-logo.jsx -->
    <svg
        class="logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 175 40"
        overflow="visible"
        aria-label="ThingBlock"
        role="img"
    >
        <defs>
            <linearGradient id="tb-logo-orange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FFD166" />
                <stop offset="100%" stop-color="#FF7B35" />
            </linearGradient>
            <linearGradient id="tb-logo-lime" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#D9F99D" />
                <stop offset="100%" stop-color="#84CC16" />
            </linearGradient>
            <filter id="tb-logo-shadow">
                <feDropShadow dx="1" dy="2" stdDeviation="0.5" flood-color="#0D2800" flood-opacity="0.75" />
            </filter>
        </defs>
        <text
            x="2"
            y="30"
            font-family="'Fredoka One', cursive"
            font-size="31"
            stroke="white"
            stroke-width="5.5"
            stroke-linejoin="round"
            paint-order="stroke fill"
            filter="url(#tb-logo-shadow)"
        >
            <tspan fill="url(#tb-logo-orange)">Thing</tspan><tspan fill="url(#tb-logo-lime)">Block</tspan>
        </text>
    </svg>
</header>

<style>
    /* Bundled locally so the logo renders offline */
    @font-face {
        font-family: 'Fredoka One';
        src: url('../assets/fonts/fredoka-one.woff2') format('woff2');
        font-display: swap;
    }
    header {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 3rem;
        padding: 0 12px;
        background: #4c97ff;
        color: #fff;
    }
    .logo {
        height: 1.6rem;
    }
</style>
