export function parseAttributes( rawSpecs, baseAttrs ){
    const localAttrs = parse( rawSpecs ),
          allAttrs = defaults( localAttrs, baseAttrs );

    return {
        _attributes : allAttrs,
        properties : createProperties( localAttrs ),
        forEach : createForEach( allAttrs ),
        Attributes : createCloneCtor( allAttrs ),
        defaults : createDefaults( allAttrs ),
        toJSON : createToJSON( allAttrs ),
        parse : createParse( allAttrs )
    }
}