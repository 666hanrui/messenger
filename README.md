# Messenger Reference Snapshot

This repository currently has one clear job: preserve a static local snapshot of Abeto's Messenger as a reference, and keep the planning documents for the future game 《南都爱情故事》.

It is not the current source-code project for 《南都爱情故事》. Do not add experiments, model conversion output, Vite projects, Blender exports, or temporary prototypes directly into this repository root.

## What Is Here

- `index.html`  
  The captured entry page for the original Messenger site.

- `assets/`  
  Static assets required by the captured site: JavaScript bundles, Draco geometry, textures, fonts, audio, workers, and support libraries.

- `robots.txt`  
  The original site's robots/content-signal file, kept with the capture.

- `docs/`  
  Planning and writing documents for 《南都爱情故事》.

- `44bdbdb0-b663-47c1-95f5-14066afccd72`  
  A captured original-site resource kept with the static snapshot.

## Local Preview

From the repository root:

```bash
python3 -m http.server 3001 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:3001/
```

## Project Boundary

Keep this repository as:

1. original Messenger reference snapshot
2. planning and narrative documentation for 《南都爱情故事》

When the real game implementation starts again, create a separate clean game project or a deliberately separated `game/` directory. The production project should have its own source tree, asset pipeline, dependencies, and build scripts. It should not be mixed into this static reference snapshot casually.

## Current Planning Documents

- `docs/nanjing-slow-mail-concept.md`  
  Early concept document for the Nanjing slow-mail narrative direction.

- `docs/nandu-love-story-draft.md`  
  Approved story draft text.

- `docs/audio-scene-generation-plan.md`  
  Audio, music, ambience, voice, and scene-trigger planning.

- `docs/project-architecture.md`  
  Future architecture proposal for rebuilding the game cleanly.

- `docs/original-site-capture.md`  
  Notes about the captured original Messenger site.

## Rights Note

The original Messenger assets and captured site belong to their original creators. This repository is being used as a reference snapshot for study and planning. A future public release of 《南都爱情故事》 should use original assets, licensed assets, or assets with explicit permission.
