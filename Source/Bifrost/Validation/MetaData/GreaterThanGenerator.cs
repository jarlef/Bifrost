﻿#region License
//
// Copyright (c) 2008-2013, Dolittle (http://www.dolittle.com)
//
// Licensed under the MIT License (http://opensource.org/licenses/MIT)
//
// You may not use this file except in compliance with the License.
// You may obtain a copy of the license at 
//
//   http://github.com/dolittle/Bifrost/blob/master/MIT-LICENSE.txt
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
#endregion
using System;
using FluentValidation.Validators;

namespace Bifrost.Validation.MetaData
{
    /// <summary>
    /// Represents the generater that can generate a <see cref="GreaterThan"/> rule from
    /// a <see cref="GreaterThanValidator"/>
    /// </summary>
    public class GreaterThanGenerator : ICanGenerateRule
    {
#pragma warning disable 1591 // Xml Comments
        public Type[] From { get { return new[] { typeof(GreaterThanValidator) }; } }

        public Rule GeneratorFrom(IPropertyValidator propertyValidator)
        {
            return new GreaterThan
            {
                Value = ((GreaterThanValidator)propertyValidator).ValueToCompare,
                Message = propertyValidator.ErrorMessageSource.GetString()
            };
        }
#pragma warning restore 1591 // Xml Comments

    }
}
