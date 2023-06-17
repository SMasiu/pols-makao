'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Application documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GameModule.html" data-type="entity-link" >GameModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-GameModule-20e60984aaa329169393565252c9545ef22e212f1710fb99161174bcb2776e98c42e31c57af02f67bec4fd57467650177ea6721bd72705538430b9dd8f3aba7f"' : 'data-target="#xs-injectables-links-module-GameModule-20e60984aaa329169393565252c9545ef22e212f1710fb99161174bcb2776e98c42e31c57af02f67bec4fd57467650177ea6721bd72705538430b9dd8f3aba7f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GameModule-20e60984aaa329169393565252c9545ef22e212f1710fb99161174bcb2776e98c42e31c57af02f67bec4fd57467650177ea6721bd72705538430b9dd8f3aba7f"' :
                                        'id="xs-injectables-links-module-GameModule-20e60984aaa329169393565252c9545ef22e212f1710fb99161174bcb2776e98c42e31c57af02f67bec4fd57467650177ea6721bd72705538430b9dd8f3aba7f"' }>
                                        <li class="link">
                                            <a href="injectables/GameFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GameFactory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GameStore.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GameStore</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PlayerFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlayerFactory</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/JwtModule.html" data-type="entity-link" >JwtModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-JwtModule-07748321ab8db3a745debe089a42d3e153366deb3290500507d474f08d0c310c56dc0f6f11ab6ea0fa43a4ce78a83d08f5052f7e944df31c14883d839698104a"' : 'data-target="#xs-injectables-links-module-JwtModule-07748321ab8db3a745debe089a42d3e153366deb3290500507d474f08d0c310c56dc0f6f11ab6ea0fa43a4ce78a83d08f5052f7e944df31c14883d839698104a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JwtModule-07748321ab8db3a745debe089a42d3e153366deb3290500507d474f08d0c310c56dc0f6f11ab6ea0fa43a4ce78a83d08f5052f7e944df31c14883d839698104a"' :
                                        'id="xs-injectables-links-module-JwtModule-07748321ab8db3a745debe089a42d3e153366deb3290500507d474f08d0c310c56dc0f6f11ab6ea0fa43a4ce78a83d08f5052f7e944df31c14883d839698104a"' }>
                                        <li class="link">
                                            <a href="injectables/JwtService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PubSubModule.html" data-type="entity-link" >PubSubModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PubSubModule-e5a809c1cd060bd466cd24595a907ebda16851971ea5125d0ee570d6e4f8ed7c7e9bd7aa692873c3bbe1522260d21a6e1b5062899531806feb3374d29329d18e"' : 'data-target="#xs-injectables-links-module-PubSubModule-e5a809c1cd060bd466cd24595a907ebda16851971ea5125d0ee570d6e4f8ed7c7e9bd7aa692873c3bbe1522260d21a6e1b5062899531806feb3374d29329d18e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PubSubModule-e5a809c1cd060bd466cd24595a907ebda16851971ea5125d0ee570d6e4f8ed7c7e9bd7aa692873c3bbe1522260d21a6e1b5062899531806feb3374d29329d18e"' :
                                        'id="xs-injectables-links-module-PubSubModule-e5a809c1cd060bd466cd24595a907ebda16851971ea5125d0ee570d6e4f8ed7c7e9bd7aa692873c3bbe1522260d21a6e1b5062899531806feb3374d29329d18e"' }>
                                        <li class="link">
                                            <a href="injectables/PubSubService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PubSubService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BasicCard.html" data-type="entity-link" >BasicCard</a>
                            </li>
                            <li class="link">
                                <a href="classes/BlockCard.html" data-type="entity-link" >BlockCard</a>
                            </li>
                            <li class="link">
                                <a href="classes/Card.html" data-type="entity-link" >Card</a>
                            </li>
                            <li class="link">
                                <a href="classes/CardModel.html" data-type="entity-link" >CardModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColorCard.html" data-type="entity-link" >ColorCard</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectToGameCommand.html" data-type="entity-link" >ConnectToGameCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectToGameHandler.html" data-type="entity-link" >ConnectToGameHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateGameCommand.html" data-type="entity-link" >CreateGameCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateGameHandler.html" data-type="entity-link" >CreateGameHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateGameModel.html" data-type="entity-link" >CreateGameModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePlayerModel.html" data-type="entity-link" >CreatePlayerModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/DisconnectFromGameCommand.html" data-type="entity-link" >DisconnectFromGameCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/DisconnectFromGameHandler.html" data-type="entity-link" >DisconnectFromGameHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/DrawCard.html" data-type="entity-link" >DrawCard</a>
                            </li>
                            <li class="link">
                                <a href="classes/DrawCardCommand.html" data-type="entity-link" >DrawCardCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/DrawCardHandler.html" data-type="entity-link" >DrawCardHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/Game.html" data-type="entity-link" >Game</a>
                            </li>
                            <li class="link">
                                <a href="classes/GameModel.html" data-type="entity-link" >GameModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/GameResolver.html" data-type="entity-link" >GameResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/GamesUpdatedEvent.html" data-type="entity-link" >GamesUpdatedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/GamesUpdatedHandler.html" data-type="entity-link" >GamesUpdatedHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GameUpdatedEvent.html" data-type="entity-link" >GameUpdatedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/GameUpdatedHandler.html" data-type="entity-link" >GameUpdatedHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetGameHandler.html" data-type="entity-link" >GetGameHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetGameQuery.html" data-type="entity-link" >GetGameQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetGamesHandler.html" data-type="entity-link" >GetGamesHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetGamesQuery.html" data-type="entity-link" >GetGamesQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitializeConnectionCommand.html" data-type="entity-link" >InitializeConnectionCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitializeConnectionHandler.html" data-type="entity-link" >InitializeConnectionHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/JoinToGameCommand.html" data-type="entity-link" >JoinToGameCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/JoinToGameHandler.html" data-type="entity-link" >JoinToGameHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveFromGameCommand.html" data-type="entity-link" >LeaveFromGameCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeaveFromGameHandler.html" data-type="entity-link" >LeaveFromGameHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/NextPlayerCommand.html" data-type="entity-link" >NextPlayerCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/NextPlayerHandler.html" data-type="entity-link" >NextPlayerHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlaceCardCommand.html" data-type="entity-link" >PlaceCardCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlaceCardHandler.html" data-type="entity-link" >PlaceCardHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlaceCardModel.html" data-type="entity-link" >PlaceCardModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Player.html" data-type="entity-link" >Player</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlayerModel.html" data-type="entity-link" >PlayerModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueenCard.html" data-type="entity-link" >QueenCard</a>
                            </li>
                            <li class="link">
                                <a href="classes/StartGameCommand.html" data-type="entity-link" >StartGameCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/StartGameHandler.html" data-type="entity-link" >StartGameHandler</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/GameAuthInterceptor.html" data-type="entity-link" >GameAuthInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GameFactory.html" data-type="entity-link" >GameFactory</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GameStore.html" data-type="entity-link" >GameStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlayerFactory.html" data-type="entity-link" >PlayerFactory</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/PlayerGuard.html" data-type="entity-link" >PlayerGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Ctx.html" data-type="entity-link" >Ctx</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtData.html" data-type="entity-link" >JwtData</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});