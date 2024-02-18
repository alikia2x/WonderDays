importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js')
workbox.loadModule('workbox-core')
workbox.loadModule('workbox-routing')
workbox.loadModule('workbox-cacheable-response')
workbox.loadModule('workbox-strategies')
workbox.loadModule('workbox-expiration')
workbox.loadModule('workbox-precaching')

const { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } = workbox.precaching
const { clientsClaim } = workbox.core
const { NavigationRoute, registerRoute } = workbox.routing

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)
precacheAndRoute(['/'])

// clean old assets
cleanupOutdatedCaches()

let allowlist
if (import.meta.env.DEV)
  allowlist = [/^\/$/]

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('/'),
  { allowlist },
))

self.skipWaiting()
clientsClaim()
