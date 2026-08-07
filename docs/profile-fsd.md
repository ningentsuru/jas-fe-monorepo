portfolio/
┣ app/                           # Mandatory Nuxt 4 Frontend Root Container
┃ ┣ assets/                      # Shared global asset layer
┃ ┃ ┗ css/
┃ ┃   ┣ fonts.css
┃ ┃   ┗ main.css
┃ ┣ shared/                      # FSD Shared: Primitives & domain-free tools
┃ ┃ ┣ composables/
┃ ┃ ┃ ┣ useApi.ts
┃ ┃ ┃ ┣ useAppTheme.ts
┃ ┃ ┃ ┗ useDateFormat.ts
┃ ┃ ┗ types/
┃ ┃   ┗ index.ts
┃ ┣ entities/                    # FSD Entities: Business data concepts
┃ ┃ ┣ chat/
┃ ┃ ┃ ┣ model/types.ts
┃ ┃ ┃ ┗ index.ts
┃ ┃ ┗ profile/
┃ ┃   ┣ data/profile.ts
┃ ┃   ┣ model/types.ts
┃ ┃   ┗ index.ts
┃ ┣ features/                    # FSD Features: Direct user actions / triggers
┃ ┃ ┗ toggle-chat/
┃ ┃   ┣ ui/FloatingChatButton.vue
┃ ┃   ┗ index.ts
┃ ┣ widgets/                     # FSD Widgets: Composition layout blocks
┃ ┃ ┣ about-me/
┃ ┃ ┃ ┣ ui/AboutMe.vue
┃ ┃ ┃ ┗ index.ts
┃ ┃ ┣ chat-widget/
┃ ┃ ┃ ┣ ui/ChatWidget.vue
┃ ┃ ┃ ┗ index.ts
┃ ┃ ┗ landing-bio/
┃ ┃   ┣ ui/LandingBio.vue
┃ ┃   ┗ index.ts
┃ ┣ layouts/                     # Nuxt App Layout Layer
┃ ┃ ┗ default.vue
┃ ┣ pages/                       # Nuxt File-Based Router (FSD Page Layer)
┃ ┃ ┣ about-me.vue
┃ ┃ ┣ chat.vue
┃ ┃ ┗ index.vue
┃ ┣ app.vue                      # App Root entry
┃ ┗ error.vue                    # App Error view boundary
┣ server/                        # Nuxt Nitro Backend (Stays outside app/)
┃ ┗ api/
┃   ┣ chat.ts
┃   ┗ contact.post.ts
┣ nuxt.config.ts