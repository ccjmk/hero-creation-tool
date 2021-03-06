import * as Utils from '../utils';
import * as Constants from '../constants';
import { Step, StepEnum } from '../Step';
import FixedOption, { OptionType } from '../options/FixedOption';
import SettingKeys from '../settings';

class _Spells extends Step {
  constructor() {
    super(StepEnum.Spells);
  }

  section = () => $('#spellsDiv');

  $searchWrapper!: JQuery;
  $inputBox!: JQuery;
  $suggBox!: JQuery;
  $itemList!: JQuery;
  searchArray: Item[] = [];

  spells: Item[] = [];

  setListeners(): void {
    this.$searchWrapper = $('.hct-search-wrapper', this.section());
    this.$inputBox = $('input', this.$searchWrapper);
    this.$suggBox = $('[data-hct-searchbar-results]', this.$searchWrapper);
    this.$itemList = $('[data-hct-itemlist]', this.section());

    $('[data-hct-searchbar]', this.section()).on('submit', (event) => {
      if (this.searchArray.length == 1) {
        try {
          this.addItemToSelection(this.searchArray[0]);
          this.$inputBox.val('');
        } catch (error) {
          console.error(error);
          return false;
        }
      }
      return false;
    });

    $('[data-hct_equipment_clear]', this.section()).on('click', () => {
      this.clearOptions();
      this.$itemList.empty();
    });

    this.$inputBox.on('keyup', (e) => {
      const userData = (e.target as any).value;
      if (userData) {
        this.searchArray = this.spells.filter((data) => {
          return (data as any).name
            .toLocaleLowerCase()
            .replaceAll(/\s/g, '')
            .includes(userData.toLocaleLowerCase().replaceAll(/\s/g, ''));
        });
        this.$searchWrapper.addClass('active');
        this.showSuggestions(this.searchArray);
        $('li', this.$suggBox).on('click', (event) => {
          this.select($(event.target).data('item_name'));
        });
      } else {
        this.$searchWrapper.removeClass('active');
      }
    });
  }

  select(itemName: string) {
    const item = this.spells.find((s) => s.name === itemName);
    if (!item) ui.notifications?.error(game.i18n.localize('HCT.Spells.SelectItemError'));
    this.addItemToSelection(item!);
    this.$inputBox.val('');
    this.$searchWrapper.removeClass('active');
  }

  addItemToSelection(item: Item) {
    const itemOption = new FixedOption(StepEnum.Spells, 'items', item, undefined, {
      addValues: true,
      type: OptionType.ITEM,
    });
    itemOption.render(this.$itemList);
    this.stepOptions.push(itemOption);
  }

  showSuggestions(list: Item[]) {
    let listData;
    if (!list.length) {
      listData = `<li>${'No matches'}</li>`;
    } else {
      listData = list
        .map(
          (item: any) =>
            `<li><div class="hct-icon-with-context" data-item_name=\"${item.name}\"><img class="hct-icon-square-med" src="${item.img}"><span>${item.name}</span></div></li>`,
        )
        .join('');
    }
    this.$suggBox.html(listData);
  }

  async setSourceData() {
    const filteredSpells = (await Utils.getSources({
      baseSource: Constants.DEFAULT_PACKS.SPELLS,
      customSourcesProperty: SettingKeys.CUSTOM_SPELL_PACKS,
    })) as any;
    const maxLevel = 1;
    this.spells = filteredSpells.filter((item: Item) => (item.data as any).level <= maxLevel);
  }

  async renderData() {
    // Show rules on the side panel
    const spellsRulesItem = await Utils.getJournalFromPackByName(Constants.DEFAULT_PACKS.RULES, Constants.RULES.SPELLS);
    $('[data-hct_spells_description]', this.section()).html(TextEditor.enrichHTML((spellsRulesItem as any).content));
  }

  update(data: { class: { item: Item } }) {
    const $spellCastingAbilityElem = $('[data-hct_spellcasting_ability]', this.section());
    if (data?.class?.item) {
      const spa = (game as any).dnd5e.config.abilities[(data.class.item.data as any)?.spellcasting?.ability];
      $spellCastingAbilityElem.html(
        game.i18n.format('HCT.Spells.SpellcastingAbilityBlob', { class: data.class.item.name, spa: spa }),
      );
    } else {
      $spellCastingAbilityElem.html(game.i18n.format('HCT.Spells.SpellcastingAbilityNoClass'));
    }
  }
}
const SpellsTab: Step = new _Spells();
export default SpellsTab;
