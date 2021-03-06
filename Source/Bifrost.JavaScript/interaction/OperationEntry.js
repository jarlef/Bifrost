﻿Bifrost.namespace("Bifrost.interaction", {
    OperationEntry: Bifrost.Type.extend(function (operation, state) {
        /// <summary>Represents an entry for an operation in a specific context with resulting state</summary>
        var self = this;

        /// <field name="operation" type="Bifrost.interaction.Operation">Operation that was performed</field>
        this.operation = operation;

        /// <field name="state" type="object">State that operation generated</field>
        this.state = state;
    })
});