# Node JS Meme Generator

## Usage
```bash
# This will create a meme with the given text of height 240px, 
# with respect to the aspect ratio.
# The meme will be outputted to output.gif
node index.js <valid_path_or_url> <upper_text> <lower_text>
```

## Notes
- The GIF must have a constant frame rate to work properly.
- The URL must use either `http` or `https`, and it must be written
  explicitly. You can modify `index.js` to allow for other protocols.

## Plans
> These are just plans... I'm not guaranteeing that I will do all this...
- Customizable text size
- Text auto-shrinking to width
- Customizable fonts
- Dynamic frame rates
- Customizable meme formats with JSON (this might take a while...)