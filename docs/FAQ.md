# Frequently Asked Questions

## Why ABC doesn't automatically add X, Y, and/or Z ?
Short Answer: Because we have no way of knowing for sure.

Long Answer: The module's philosophy is to make things as easy as possible for both DMs and Players. That means not only when using the tool for creating characters for your games, but also creating your own content for your campaigns and seemlessly integrating them into the tool. For that reason, the module opts to use the vanilla Foundry-supported item types. As an alternative, we could have provided an interface for loading items on JSON or something alike, but that would skew the tool making it less friendly for all the non-tech-savvy users.

The type of item defines certain characteristics of it, namely attributes you can set and save on the item. Sadly, there are currently not item types for every use case (and there might never be, we don't know), and those that exist (like Classes and Spells) have gaps here and there.

For example, a Class can define the saving throws the owner will have, and the number and eligible skill proficiencies, but has nothing about extra language, weapon, armor or tool proficiencies, alongside many other useful information when creating a character. Therefore, the solution is to help the user automating all we *know for sure*, and letting you pick everything else from all available options.

As the DnD5e system grows and evolves, and new information becomes available in existing data types, or new data types as a whole become available, the module will be updated to keep up with them.

## How do I add my own races/classes/...
* If you are a player -> Ask your DM to set those up, and/or help him setting them up.
* If you are a DM / Helping hand -> Please, refer to the [HOW-TO](https://github.com/AndrewJiangB/hero-creation-tool/blob/main/docs/HOW-TO.md).

## Why doesn't X class have Y starting gold instead of that pesky default ?
On a similar vein to the point above, the short answer is that we don't know. Longer answer is that starting gold per class is a PHB content, something we don't have available on the SRD, so there's legalize stuff involved. For this reason, it is also unlikely that Foundry *Class*-items will ever have an Starting Gold attribute somewhere.

There are some starting gold values on the Basic Rules, but they don't cover all the cases, won't cover custom classes because of the *Class*-item detail mentioned before, and using them is some grey area on the legalize we don't want to be involved, just in case. So, default for everyone, and customize it as you see fit on your own.