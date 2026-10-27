import { createBrowserRouter, type Params } from 'react-router'
import {
  effectCategoryById,
  effectsById,
  genreFamilyById,
  genresById,
  guideById,
  instrumentFamilyById,
  instrumentsById,
  partByNumber,
  partCrumbs,
  pillarById,
  pluginsById,
  sectionByNumber,
  type Crumb,
} from '../lib/content'
import { EffectCategoryPage, EffectPage, EffectsIndex } from '../pages/EffectPages'
import ErrorPage from '../pages/ErrorPage'
import { GenreFamilyPage, GenrePage, GenresIndex } from '../pages/GenrePages'
import GuidePage from '../pages/GuidePage'
import HomePage from '../pages/HomePage'
import { BookmarksPage, GlossaryPage, ReferencePage, ToolsPage } from '../pages/HubPages'
import { InstrumentFamilyPage, InstrumentPage, InstrumentsIndex } from '../pages/InstrumentPages'
import { PartPage, PillarPage } from '../pages/LearnPages'
import NotFoundPage from '../pages/NotFoundPage'
import { PluginPage, PluginsIndex } from '../pages/PluginPages'
import { AppShell } from './AppShell'
import type { RouteHandle } from './TopBar'

const crumbs = (fn: (p: Params) => Crumb[]): RouteHandle => ({ crumbs: fn })
const EFFECTS: Crumb = { label: 'Effects', href: '/effects' }
const INSTRUMENTS: Crumb = { label: 'Instruments', href: '/instruments' }
const GENRES: Crumb = { label: 'Genres', href: '/genres' }

function sectionCrumbs(p: Params): Crumb[] {
  const section = sectionByNumber.get(p.section ?? '')
  const part = section && partByNumber.get(section.part)
  if (!section || !part) return []
  const page = p.entryId ? guideById.get(p.entryId) : section.pages[0]
  return [...partCrumbs(part), { label: `${section.number} ${page?.title ?? section.shortTitle}` }]
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, handle: crumbs(() => []) },
      { path: 'learn/:pillarId', element: <PillarPage />, handle: crumbs((p) => [{ label: pillarById.get(p.pillarId ?? '')?.name ?? 'Pillar' }]) },
      {
        path: 'part/:part',
        element: <PartPage />,
        handle: crumbs((p) => {
          const part = partByNumber.get(Number(p.part))
          return part ? partCrumbs(part) : []
        }),
      },
      { path: 'guide/:section/:entryId?', element: <GuidePage />, handle: crumbs(sectionCrumbs) },
      { path: 'effects', element: <EffectsIndex />, handle: crumbs(() => [{ label: 'Effects' }]) },
      { path: 'effects/category/:categoryId', element: <EffectCategoryPage />, handle: crumbs((p) => [EFFECTS, { label: effectCategoryById.get(p.categoryId ?? '')?.name ?? 'Category' }]) },
      {
        path: 'effects/:id',
        element: <EffectPage />,
        handle: crumbs((p) => {
          const e = effectsById.get(p.id ?? '')
          const cat = e && effectCategoryById.get(e.category)
          return [EFFECTS, ...(cat ? [{ label: cat.name, href: `/effects/category/${cat.id}` }] : []), { label: e?.name ?? 'Effect' }]
        }),
      },
      { path: 'instruments', element: <InstrumentsIndex />, handle: crumbs(() => [{ label: 'Instruments' }]) },
      { path: 'instruments/family/:familyId', element: <InstrumentFamilyPage />, handle: crumbs((p) => [INSTRUMENTS, { label: instrumentFamilyById.get(p.familyId ?? '')?.name ?? 'Family' }]) },
      {
        path: 'instruments/:id',
        element: <InstrumentPage />,
        handle: crumbs((p) => {
          const i = instrumentsById.get(p.id ?? '')
          const fam = i && instrumentFamilyById.get(i.family)
          return [INSTRUMENTS, ...(fam ? [{ label: fam.name, href: `/instruments/family/${fam.id}` }] : []), { label: i?.name ?? 'Instrument' }]
        }),
      },
      { path: 'genres', element: <GenresIndex />, handle: crumbs(() => [{ label: 'Genres' }]) },
      { path: 'genres/family/:familyId', element: <GenreFamilyPage />, handle: crumbs((p) => [GENRES, { label: genreFamilyById.get(p.familyId ?? '')?.name ?? 'Family' }]) },
      {
        path: 'genres/:id',
        element: <GenrePage />,
        handle: crumbs((p) => {
          const g = genresById.get(p.id ?? '')
          const fam = g && genreFamilyById.get(g.family)
          return [GENRES, ...(fam ? [{ label: fam.name, href: `/genres/family/${fam.id}` }] : []), { label: g?.name ?? 'Genre' }]
        }),
      },
      { path: 'plugins', element: <PluginsIndex />, handle: crumbs(() => [{ label: 'Plugin Registry' }]) },
      { path: 'plugins/:id', element: <PluginPage />, handle: crumbs((p) => [{ label: 'Plugin Registry', href: '/plugins' }, { label: pluginsById.get(p.id ?? '')?.name ?? 'Plugin' }]) },
      { path: 'glossary', element: <GlossaryPage />, handle: crumbs(() => [{ label: 'Glossary' }]) },
      { path: 'reference', element: <ReferencePage />, handle: crumbs(() => [{ label: 'Quick Reference' }]) },
      { path: 'tools', element: <ToolsPage />, handle: crumbs(() => [{ label: 'Interactive Tools' }]) },
      { path: 'bookmarks', element: <BookmarksPage />, handle: crumbs(() => [{ label: 'Bookmarks' }]) },
      {
        path: 'design',
        lazy: async () => ({ Component: (await import('../pages/DesignPage')).default }),
        handle: crumbs(() => [{ label: 'Design System' }]),
      },
      ...(import.meta.env.DEV
        ? [{ path: 'status', lazy: async () => ({ Component: (await import('../pages/StatusPage')).default }), handle: crumbs(() => [{ label: 'Content Status' }]) }]
        : []),
      { path: '*', element: <NotFoundPage />, handle: crumbs(() => [{ label: 'Not found' }]) },
    ],
  },
], { basename })
