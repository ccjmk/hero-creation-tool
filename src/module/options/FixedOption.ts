import { StepEnum } from '../Step';
import { ActorDataConstructorData } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/actorData';
import HeroOption, { apply } from './HeroOption';

/**
 * Represents a fixed value that will be imprinted into the created actor
 * (e.g. how all Elves get Perception proficiency)
 * @class
 */
export default class FixedOption implements HeroOption {
  constructor(
    readonly origin: StepEnum,
    readonly key: string,
    private option: string | number | Item | { cp: number; sp: number; gp: number },
    private textToShow?: string,
    readonly settings: {
      addValues: boolean;
      type: OptionType;
      quantity?: number;
    } = { addValues: false, type: OptionType.TEXT },
  ) {}

  isFulfilled() {
    return !!this.option;
  }

  applyToHero(actor: ActorDataConstructorData) {
    if (this.settings.type == OptionType.ITEM && this.settings.quantity && this.settings.quantity > 1) {
      (this.option as any).data.quantity = this.settings.quantity;
    }

    apply(
      actor,
      this.key,
      this.settings.type === OptionType.TEXT || this.settings.type === OptionType.CURRENCY
        ? this.value()
        : this.settings.type === OptionType.NUMBER
        ? (this.value() as number)
        : [this.value()],
      this.settings.addValues,
      this.settings.type === OptionType.NUMBER,
    );
  }

  private $textElem = $('<p class="hct-option">').html(`${this.textToShow}`);
  private $itemImg = $('<img class="hct-icon">');
  private $itemName = $('<p>');

  /**
   * Builds the HTML element for this option and appends it to the parent
   * @param {JQuery} parent
   */
  render(parent: JQuery): void {
    if (this.settings.type === OptionType.TEXT) {
      parent.append(this.$textElem);
    } else {
      const $container = $('<div class="hct-icon-with-context">');
      const item: Item = this.option as Item;
      const source = (item as any).flags.core.sourceId.split('.');
      const pack = `${source[1]}.${source[2]}`;
      const id = source[3];
      const $link = $(`<a class="entity-link hct-icon-link" draggable="false" data-pack="${pack}" data-id="${id}">`);
      this.$itemImg.attr('src', item.img);
      $link.append(this.$itemImg);
      this.$itemName.html(this.textToShow ?? (item.name as string));
      $container.append($link);
      $container.append(this.$itemName);
      parent.append($container);
    }
  }

  /**
   * @returns the current value of this option
   */
  value(): any {
    return this.option;
  }
}

export enum OptionType {
  TEXT,
  ITEM,
  NUMBER,
  CURRENCY,
}
