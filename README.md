# What is this

This is a TablePlus's Plugin, by install `askgpt3` you will have a menu `Ask GPT-3` in context menu. You can ask GPT-3 anything you want based on your current database schema.
It has simple UI, you can ask GPT-3 anything you want, and it will generate a SQL script for you.
UI is draft, I will improve it later (**you can help me if you want**). See my other project [gpt-sql-box](https://github.com/Hormold/gpt-sql-box).

# Install

### From release

No release yet, don't know how to publish a plugin to TablePlus.

### Build from source

```
git clone git@github.com:Hormold/askgpt3.git
cd askgpt3/tabledump.tableplusplugin
npm install
npm run build
open .
```

# How to use

1. Open a connection.
3. Right on a item in left panel.
4. Select `Ask GPT-3` in menu.

# License

askgpt3 is released under the MIT license. See [LICENSE](https://github.com/Hormold/askgpt3/blob/master/LICENSE) for details.
